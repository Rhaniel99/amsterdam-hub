import { DataTypes } from 'sequelize';

export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Tools', 'color', {
            type: DataTypes.STRING
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Tools', 'color');
    }
};
