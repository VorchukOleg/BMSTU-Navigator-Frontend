'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use('*/public', express.static(path.resolve(__dirname, '..', 'public')));
// app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use('*/images', express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cookie());

const port = process.env.PORT || 8008;

app.get(/^\/(?!.*\.(js|ttf)$).*$/, function(request, response) {
    response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
    response.set('Cache-Control', 'public, max-age=60000');
  });

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
