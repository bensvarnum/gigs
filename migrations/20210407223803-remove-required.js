'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'password', { type: Sequelize.STRING })
  },

  down: async (queryInterface, Sequelize) => {

  }
};
