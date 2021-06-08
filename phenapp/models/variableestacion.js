'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariableEstacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        VariableEstacion.belongsTo(models.Estacion, {unique: 'plantilla'});
        VariableEstacion.belongsTo(models.Variable, {unique: 'plantilla'});
        VariableEstacion.belongsTo(models.Horario, {unique: 'plantilla'});
        VariableEstacion.belongsTo(models.Instrumento, {unique: 'plantilla'});
    }
  };
  VariableEstacion.init({
    id: {type:DataTypes.INTEGER,unique:true,primaryKey:true,autoIncrement:true},
    enable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'VariableEstacion',
    tableName: 'VariableEstacion',
  });
  return VariableEstacion;
};