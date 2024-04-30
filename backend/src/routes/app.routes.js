import { Router } from 'express';
const router = Router();
// const Tag = require("../models/tags");

// const AppController = require("../controllers/app.controller");
import { regShorts, regTools, getTools, getShots } from '../controllers/hub.controller.js';

router.post('/reg-tools', [], regTools);
router.post('/reg-shorts', [], regShorts);
router.get('/get-tools', [], getTools);
router.get('/get-shorts', [], getShots);

router.get('/', (req, res) => {
    res.render('index');
});

// router.post("/data", async (req, res) => {
//     const { name, description } = req.body;
//     try {
//       // Inserir os dados no banco de dados usando Sequelize
//       const newUser = await Tag.create({ name, description }); // Cria um novo usuário com os dados fornecidos
//       res.json({ message: "User added successfully", userId: newUser.id });
//     } catch (error) {
//       console.error('Error adding user:', error);
//       res.status(500).json({ error: 'Error adding user' });
//     }
//   });

// router.get('/quotes', async (req, res) => {
//     try {
//         const quotes = await Quote.findAll();
//         res.render('quotes-view', { quotes });
//       } catch (error) {
//         console.error(error);
//         res.status(500).send('Erro ao buscar as citações');
//       }
// });

export default router;