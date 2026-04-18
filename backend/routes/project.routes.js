const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/project.controller');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
