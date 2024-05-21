'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tools', 'iconMessageID', {
      type: Sequelize.STRING,
      allowNull: true, // Adicione essa linha se o campo pode ser nulo, caso contrário remova.
    });

    await queryInterface.addColumn('Tools', 'iconChannelID', {
      type: Sequelize.STRING,
      allowNull: true, // Adicione essa linha se o campo pode ser nulo, caso contrário remova.
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tools', 'iconMessageID');
    await queryInterface.removeColumn('Tools', 'iconChannelID');
  }
};
