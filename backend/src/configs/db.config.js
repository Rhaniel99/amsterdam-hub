import { fileURLToPath } from 'url';
import path from 'path';
import Sequelize from 'sequelize';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const databasePath = path.resolve(__dirname, '../../data/db-amsterdam.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
});

sequelize.sync()
  .then(() => {
    console.log('Todos os modelos foram sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar os modelos com o banco de dados:', error);
  });

export default sequelize;
