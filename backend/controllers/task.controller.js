const Task = require('../models/Task');

// Get tasks by project
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name')
      .populate('owner', 'name')
      .populate('project', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create task
const createTask = async (req, res) => {
  const { title, description, priority, deadline, assignedTo, project } = req.body;
  try {
    const task = new Task({
      title,
      description,
      priority,
      deadline,
      assignedTo,
      project,
      owner: req.user.id
    });
    await task.save();
    await task.populate('assignedTo', 'name').populate('owner', 'name').populate('project', 'name');
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { title, description, status, priority, deadline, assignedTo } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check authorization
    if (task.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, deadline, assignedTo },
      { new: true }
    ).populate('assignedTo', 'name').populate('owner', 'name').populate('project', 'name');

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
