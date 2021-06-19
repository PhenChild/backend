'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  Estacion.init({
    codigo: {type:DataTypes.STRING,unique:true,primaryKey:true},
    nombreEstacion: DataTypes.STRING,
    posicion: DataTypes.GEOMETRY,
    altitud: DataTypes.FLOAT,
    suelo: DataTypes.STRING,
    omm: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estacion',
    tableName: 'Estacion',
  });
  return Estacion;
};