
export default {
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('Tools', 'color', {
            type: Sequelize.STRING
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn('Tools', 'color');
    }
};
