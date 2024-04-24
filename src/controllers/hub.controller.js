const Tools = require("../models/hub").Tools;
const Shortcuts = require("../models/hub").Shortcuts;

const regTools = async (req, res) => {
    let { name } = req.body;
    name = name.toLowerCase();
    try {
        const newEntry = await Tools.create({ name }); // Usando Tools.create para salvar apenas na tabela Tools
        res.status(201).json({ message: "Entrada criada com sucesso", data: newEntry });
    } catch (error) {
        console.error("Erro ao salvar no banco de dados:", error);
        res.status(500).json({ message: "Erro ao salvar no banco de dados" });
    }
};

const regShorts = async (req, res) => {
    const { toolId, name, command } = req.body;
    try {
        // Verificar se a ferramenta com o ID fornecido existe
        const tool = await Tools.findByPk(toolId);
        if (!tool) {
            return res.status(404).json({ message: "Ferramenta não encontrada" });
        }
        // Criar um novo atalho associado à ferramenta
        const newShortcut = await Shortcuts.create({ name, command, ToolId: toolId });
        // Se a criação for bem-sucedida, envie uma resposta de sucesso
        res.status(201).json({ message: "Atalho registrado com sucesso", data: newShortcut });
    } catch (error) {
        // Se ocorrer um erro, envie uma resposta de erro
        console.error("Erro ao registrar atalho:", error);
        res.status(500).json({ message: "Erro ao registrar atalho" });
    }
};

module.exports = {
    regTools,
    regShorts,
  };