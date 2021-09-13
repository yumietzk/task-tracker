const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// CREATE
router.post('/', async (req, res) => {
  const { title, date, status, duedate, description, todos, userId } = req.body;
  const task = new Task({
    title,
    date,
    status,
    duedate,
    description,
    todos,
    userId,
  });

  try {
    await task.save();

    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send('task create failed.');
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE
router.patch('/:taskId', async (req, res) => {
  try {
    await Task.updateOne(
      { _id: req.params.taskId },
      {
        $set: {
          title: req.body.title,
          date: req.body.date,
          status: req.body.status,
          duedate: req.body.duedate,
          description: req.body.description,
          todos: req.body.todos,
        },
      }
    );

    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE
router.delete('/:taskId', async (req, res) => {
  try {
    await Task.remove({ _id: req.params.taskId });

    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
