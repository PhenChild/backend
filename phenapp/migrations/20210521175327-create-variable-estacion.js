'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VariableEstacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estacionId: {
        type: Sequelize.STRING,
        references: {
          model: 'Estacion',
          key: 'codigo'
        },
        allowNull: false
      },
      variableId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Variable',
          key: 'codigo'
        },
        allowNull: false
      },
      horarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Horario',
          key: 'codigo'
        },
        allowNull: false
      },
      instrumentoId: {
        type: Sequelize.STRING,
        references: {
          model: 'Instrumento',
          key: 'codigo'
        },
        allowNull: false
      },
      enable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VariableEstacion')
  }
}
