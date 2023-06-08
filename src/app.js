import 'dotenv/config';

import './database';

import express from 'express';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';

class App {
  constructor() {
    this.app = express();
    this.middlewares = this.middlewares();
    this.routes = this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user', userRoutes);
    this.app.use('/users', userRoutes);
  }
}

export default new App().app;
