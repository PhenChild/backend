'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TipoInstrumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
    }
  };
  TipoInstrumento.init({
    tipo: { type: DataTypes.STRING },
    enable: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'true'
    }
  }, {
    sequelize,
    modelName: 'TipoInstrumento',
    tableName: 'TipoInstrumento'
  })
  return TipoInstrumento
}
