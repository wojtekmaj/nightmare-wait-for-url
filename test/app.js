import express from 'express';
import path from 'path';
import serveStatic from 'serve-static';

const app = express();

app.use(serveStatic(path.resolve(__dirname, 'fixture')));

export default app;
