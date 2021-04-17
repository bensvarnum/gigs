"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Gigs", [
      {
        title: "E-commerce Website",
        technologies: "HTML,CSS,JavaScript",
        description: "On-line shopping website",
        contact: "stacey@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Blog Website",
        technologies: "HTML,CSS,JavaScript,Nexjs",
        description: "Blog website",
        contact: "adam@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "API/Database for local charity",
        technologies: "Node.js, Auth0, Sequelize, PostgreSQL",
        description: "Project for local charity",
        contact: "mike@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Gigs", null, {});
  },
};
