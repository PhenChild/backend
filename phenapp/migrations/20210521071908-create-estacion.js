'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Estacion', {
      codigo: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      nombreEstacion: {
        type: Sequelize.STRING
      },
      jefeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Observador',
          key: 'id'
        }
      },
      posicion: {
        type: Sequelize.GEOMETRY
      },
      altitud: {
        type: Sequelize.FLOAT
      },
      suelo: {
        type: Sequelize.STRING
      },
      omm: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Estacion')
  }
}
