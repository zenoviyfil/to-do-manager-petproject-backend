import cors from 'cors';
import express from 'express';

import taskRoutes from './routes/taskRoutes'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('To-Do Manager API is running!');
});

app.use('/api', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
