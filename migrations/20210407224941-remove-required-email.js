'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'email', { type: Sequelize.STRING, allowNull: true })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'email', { type: Sequelize.STRING, allowNull: false })
  }
};
