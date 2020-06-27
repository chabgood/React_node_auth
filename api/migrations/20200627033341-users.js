'use strict'
var DataTypes = require('sequelize/lib/data-types')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        method: {
          type: DataTypes.ENUM('local', 'google', 'facebook')
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        charset: 'latin1', // default: null
        schema: 'public' // default: public, PostgreSQL only.
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('public.users')
  }
}
