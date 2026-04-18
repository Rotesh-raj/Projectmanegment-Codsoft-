const Project = require('../models/Project');

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('owner', 'name email').populate('members', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create project
const createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = new Project({
      name,
      description,
      owner: req.user.id
    });
    await project.save();
    await project.populate('owner', 'name email');
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update project
const updateProject = async (req, res) => {
  const { name, description, status, members } = req.body;
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (project.owner.toString() !== req.user.id && project.owner.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, status, members },
      { new: true }
    ).populate('owner', 'name email').populate('members', 'name email');

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
