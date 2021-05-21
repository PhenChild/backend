'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'observer', 'viewer', 'user'),
      defaultValue: 'user' /**pending validation in backend for observer only type observer */
     }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};