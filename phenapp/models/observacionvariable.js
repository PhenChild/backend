'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ObservacionVariable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      ObservacionVariable.belongsTo(models.VariableEstacion)
      ObservacionVariable.belongsTo(models.Observador)
    }
  };
  ObservacionVariable.init({
    valor: DataTypes.STRING,
    fechaObservacion: DataTypes.DATE,
    posicionObservacion: DataTypes.GEOMETRY
  }, {
    sequelize,
    modelName: 'ObservacionVariable',
    tableName: 'ObservacionVariable'
  })
  return ObservacionVariable
}
