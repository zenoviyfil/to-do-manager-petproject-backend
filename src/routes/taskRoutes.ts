import express from 'express';
import { Task } from '../models/task';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let tasks: Task[] = [];

router.post('/tasks', (req, res) => {
    const { title, description, deadline } = req.body;
    const newTask: Task = { id: uuidv4(), title, description, deadline, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.get('/tasks', (req, res) => {
    res.json(tasks);
});

router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, completed } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, description, deadline, completed };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).end();
});

export default router;
