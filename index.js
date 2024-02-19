const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.set('view engine', 'hbs');

const controller = require('./controller');

app.get('/', controller.getData)
console.log(process.env.DB_USER);
app.listen(PORT, () => console.log(`server start on port ${PORT}`));

