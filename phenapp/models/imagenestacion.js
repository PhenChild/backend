'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ImagenEstacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      ImagenEstacion.belongsTo(models.Estacion)
    }
  };
  ImagenEstacion.init({
    descripcion: DataTypes.STRING,
    imagen: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'ImagenEstacion',
    tableName: 'ImagenEstacion'
  })
  return ImagenEstacion
}
