const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
const auth = require('../middlewares/auth');
const router = express.Router({ mergeParams: true });

router.get('/:projectId', auth, getTasks);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
