/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const serve = require('serve-static');

const app = express();

app.use(serve(path.resolve(__dirname, 'fixture')));

// Start if not required
if (!module.parent) app.listen(7500);

module.exports = app;
