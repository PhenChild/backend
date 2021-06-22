'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Observador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Observador.belongsTo(models.Estacion)
      Observador.hasOne(models.Estacion, { as: 'Jefe', constraints: false })
      Observador.belongsTo(models.User)
    }
  };
  Observador.init({
    enable: { type: DataTypes.BOOLEAN, defaultValue: 'true' }
  }, {
    sequelize,
    modelName: 'Observador',
    tableName: 'Observador'
  })
  return Observador
}
