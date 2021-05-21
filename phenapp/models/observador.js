'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Observador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Observador.belongsTo(models.Observador);
      Observador.belongsTo(models.Estacion);
    }
  };
  Observador.init({
    isJefe: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Observador',
    tableName: 'Observador',
  });
  return Observador;
};