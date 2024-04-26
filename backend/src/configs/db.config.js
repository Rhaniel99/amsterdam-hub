const Sequelize = require("sequelize");
const path = require("path");

const databasePath = path.resolve(__dirname, "../../data/db-amsterdam.sqlite");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
});

sequelize.sync() // Sincroniza todos os modelos com o banco de dados
  .then(() => {
    console.log('Todos os modelos foram sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar os modelos com o banco de dados:', error);
  });

module.exports = sequelize;