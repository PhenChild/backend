'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ObservacionVariable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ObservacionVariable.belongsTo(models.VariableEstacion);
    }
  };
  ObservacionVariable.init({
    valor: DataTypes.STRING,
    isEditable: DataTypes.BOOLEAN,
    fechaObservacion: DataTypes.DATE,
    posicionObservacion: DataTypes.GEOMETRY,
    eventoClima: {
      type: DataTypes.ENUM('Granizada', 'Nevada', 'Niebla', 'Tormenta Electrica','Ninguno'),
      defaultValue: 'Ninguno' /**pending validation in backend for observer only type observer */
     }
  }, {
    sequelize,
    modelName: 'ObservacionVariable',
    tableName: 'ObservacionVariable',
  });
  return ObservacionVariable;
};