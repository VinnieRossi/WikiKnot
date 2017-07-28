var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

const connectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds111103.mlab.com:11103/wikiknotusers`;
var db = mongojs(connectionString, ['tasks']);

// Get all tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) { res.send(err); }
        res.json(tasks);
    });
});

// Get single task
router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) { res.send(err); }
        res.json(task);
    });
});

// Save task
router.post('/task', (req, res, next) => {
    let task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) { res.send(err); }
            res.json(task);
        });
    }
});

// Delete task
router.delete('/task/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if (err) { res.send(err); }
        res.json(task);
    });
});

// Update task
router.put('/task/:id', (req, res, next) => {
    let task = req.body;
    let updatedTask = {};
    if (task.isDone) {
        updatedTask.isDone = task.isDone;
    }
    if (task.title) {
        updatedTask.title = task.title;
    }
    if (!updatedTask) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTask, {}, (err, task) => {
            if (err) { res.send(err); }
            res.json(task);
        });
    }
});

module.exports = router;