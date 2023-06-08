import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Language from '../models/language';
import User from '../models/user';

const models = [Language, User];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
