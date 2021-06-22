'use strict'
const ROLES = require('../constants/ENUM').ROLES
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'true'
    },
    role: {
      type: DataTypes.ENUM(ROLES),
      defaultValue: 'user' /** pending validation in backend for observer only type observer */
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User'
  })
  return User
}
