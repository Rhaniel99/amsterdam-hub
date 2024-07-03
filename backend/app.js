'use strict'
import 'dotenv/config';
import './src/configs/discord.config.js';

import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 6060;
const app = express();
import database from './src/configs/db.config.js'; // Caminho para o arquivo de rotas
import rotas from './src/routes/app.routes.js'; // Caminho para o arquivo de rotas
import studyRoutes from './src/routes/study.routes.js'; // Caminho para o arquivo de rotas
import paymentRoutes from './src/routes/payment.routes.js';

app.use(express.json());
app.use(cors());

app.use("/api/app", rotas);
app.use('/api/app/payment', paymentRoutes);
app.use("/api/app/student", studyRoutes);


app.listen(PORT, async () => {
    console.log(`Rodando na porta ${PORT}`);
    try {
        await database.sync(); // Sincronizar o banco de dados com os modelos
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
});