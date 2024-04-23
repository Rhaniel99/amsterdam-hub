'use strict'
require("dotenv").config();
require("./src/configs/discord.config");

const express = require("express");
const PORT = process.env.PORT || 6060;
const app = express();
const database = require("./src/configs/db.config");

app.use(express.json());
app.use("/api/app", require("./src/routes/app.routes"));

app.listen(PORT, async () => {
    console.log(`Rodando na porta ${PORT}`);
    try {
        await database.sync(); // Sincronizar o banco de dados com os modelos
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
});
