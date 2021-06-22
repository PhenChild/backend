'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Instrumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Instrumento.belongsTo(models.Estacion)
    }
  };
  Instrumento.init({
    codigo: { type: DataTypes.STRING, unique: true, primaryKey: true },
    nombre: DataTypes.STRING,
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'true'
    }
  }, {
    sequelize,
    modelName: 'Instrumento',
    tableName: 'Instrumento'
  })
  return Instrumento
}
