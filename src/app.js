import 'dotenv/config';

import './database';

import express from 'express';
import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import peopleRoutes from './routes/people';

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
    this.app.use('/people', peopleRoutes);
    this.app.use('/peoples', peopleRoutes);
  }
}

export default new App().app;
