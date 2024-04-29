// Importa o Sequelize e o objeto de configuração do banco de dados
const Sequelize = require("sequelize");
const database = require("../configs/db.config");

// Define o modelo Ferramentas
const Tools = database.define('Tools', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Garante que o nome seja único
    },
    iconUrl: Sequelize.STRING,
    desc: Sequelize.STRING, // Adicionando a nova coluna description
    color: Sequelize.STRING // Adicionando a nova coluna description
});

// Define o modelo Links
const Links = database.define('Links', {
    tittle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Define o modelo TrechosCodigo
const Snippets = database.define('Snippets', {
    snippet: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lgg: Sequelize.STRING
});

// Define o modelo Atalhos
const Shortcuts = database.define('Shortcuts', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    command: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Define as associações entre as tabelas
Tools.hasMany(Links);
Tools.hasMany(Snippets);
Tools.hasMany(Shortcuts);

// Exporta os modelos
module.exports = {
    Tools,
    Links,
    Snippets,
    Shortcuts
};
