'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // Variable.belongsToMany(models.Estacion, { through: 'VariableEstacion'});
    }
  };
  Log.init({
    idRegistro: DataTypes.INTEGER,
    valorPrevio: DataTypes.STRING,
    valorNuevo: DataTypes.STRING,
    nombreUser: DataTypes.STRING,
    fechaCambio: DataTypes.DATE,
    comentario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Log',
    tableName: 'Log'
  })
  return Log
}
