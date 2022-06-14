import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configJson from '../config/config.js';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

console.log('app currently running: ', env);

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Student.belongsToMany(db.Subject, {
  through: 'studentSubject',
  as: 'subjects',
  foreignKey: 'subject_id',
});
db.Subject.belongsToMany(db.Student, {
  through: 'studentSubject',
  as: 'students',
  foreignKey: 'student_id',
});

module.exports = db;
