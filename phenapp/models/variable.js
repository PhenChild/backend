'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Variable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // Variable.belongsToMany(models.Estacion, { through: 'VariableEstacion'});
    }
  };
  Variable.init({
    nombre: DataTypes.STRING,
    unidad: DataTypes.STRING,
    maximo: DataTypes.FLOAT,
    minimo: DataTypes.FLOAT,
    tipoDato: DataTypes.STRING,
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'true'
    }
  }, {
    sequelize,
    modelName: 'Variable',
    tableName: 'Variable'
  })
  return Variable
}
