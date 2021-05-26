'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Horario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Horario.init({
    tipoHora: {
      type: DataTypes.ENUM('diario', 'parcial'),
      defaultValue: 'diario' /**pending validation in backend for observer only type observer */
    },
    hora: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Horario',
    tableName: 'Horario',
  });
  return Horario;
};