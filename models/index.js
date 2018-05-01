import Sequelize from 'sequelize';

const sequelize = new Sequelize('evolent', 'root', '12345', {
  dialect: 'postgres',
  host: 'localhost',
  operatorsAliases: Sequelize.Op,
});

const db = {
  User: sequelize.import('./user'),
};

db.sequelize = sequelize;

export default db;
