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
        VariableEstacion.belongsTo(models.Estacion);
        VariableEstacion.belongsTo(models.Variable);
        VariableEstacion.belongsTo(models.Horario);
        VariableEstacion.belongsTo(models.Instrumento);
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