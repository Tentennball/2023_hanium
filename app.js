const path = require('path');
const express = require('express');

const app = express();
const connecter = require('./connecter');

const server = app.listen(8080);
const io = require('./socket').init(server);
connecter.Socket(io);