import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'fixture')));

export default app;
