'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover a coluna 'iconUrl' da tabela 'Tools'
    await queryInterface.removeColumn('Tools', 'iconUrl');
  },

  async down(queryInterface, Sequelize) {
    // Adicionar a coluna 'iconUrl' de volta em caso de rollback
    await queryInterface.addColumn('Tools', 'iconUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
