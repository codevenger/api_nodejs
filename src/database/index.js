import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Language from '../models/language';
import User from '../models/user';
import Signin from '../models/signin';
import AccessLevel from '../models/access_level';
import ContactType from '../models/contact_type';
import People from '../models/people';
import PeopleContact from '../models/people_contact';

const models = [
  Language,
  User,
  Signin,
  AccessLevel,
  ContactType,
  PeopleContact,
  People,
];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
