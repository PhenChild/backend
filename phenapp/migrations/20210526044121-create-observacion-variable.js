'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ObservacionVariable', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.STRING
      },
      eventoClima: {
        type: Sequelize.ENUM,
        values: ['Granizada', 'Nevada', 'Niebla', 'Tormenta Electrica', 'Ninguno'],
        defaultValue: 'Ninguno'
      },
      fechaObservacion: {
        type: Sequelize.DATE
      },
      posicionObservacion: {
        type: Sequelize.GEOMETRY
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
    await queryInterface.dropTable('ObservacionVariable')
  }
}
