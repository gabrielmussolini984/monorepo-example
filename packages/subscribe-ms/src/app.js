const { resolve, join } = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes/index');
require('dotenv').config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.set('views', join(__dirname, 'views'));
    this.app.engine('handlebars', handlebars());
    this.app.set('view engine', 'handlebars');
    this.app.use(express.static(resolve(__dirname, 'public')));
    this.app.use(routes);
  }
}

module.exports = new App().app;
