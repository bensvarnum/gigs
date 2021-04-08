'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.addColumn('Users', 'githubId', { type: Sequelize.INTEGER }),
      await queryInterface.addColumn('Users', 'username', { type: Sequelize.STRING })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('Users', 'githubId', { type: Sequelize.INTEGER }),
      await queryInterface.removeColumn('Users', 'username', { type: Sequelize.STRING })
    ];
  }
};
