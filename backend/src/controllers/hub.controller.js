import path from 'path';
import multer from 'multer';
import { memoryStorage } from 'multer';
const storage = memoryStorage();
const upload = multer({ storage }).single("iconUrl");
import sharp from 'sharp';
import client from '../configs/discord.config.js'; // Caminho para o arquivo de rotas
import { Shortcuts, Tools } from '../models/hub.js';

const regTools = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error("Erro ao fazer o upload da imagem: ", err);
      return res.json({
        success: false,
        msg: "Erro ao registrar",
      });
    }

    let { name, desc } = req.body;
    // Convertendo a primeira letra do nome e da descrição para maiúscula
    name = name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    desc = desc.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());

    const iconUrl = req.file;
    console.log()
    const tools = await Tools.create({ name, desc }); // Usando Tools.create para salvar apenas na tabela Tools

    try {
      await sendIMG(client, iconUrl, tools);
      return res.json({
        success: true,
        msg: "Registrado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao enviar a imagem para o Discord:", error);
      return res.json({
        success: false,
        msg: "Erro ao registrar",
      });
    }
  });
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
    const newShortcut = await Shortcuts.create({
      name,
      command,
      ToolId: toolId,
    });
    // Se a criação for bem-sucedida, envie uma resposta de sucesso
    res
      .status(201)
      .json({ message: "Atalho registrado com sucesso", data: newShortcut });
  } catch (error) {
    // Se ocorrer um erro, envie uma resposta de erro
    console.error("Erro ao registrar atalho:", error);
    res.status(500).json({ message: "Erro ao registrar atalho" });
  }
};

function sendIMG(client, iconUrl, tools) {
  return new Promise((resolve, reject) => {
    const channelId = process.env.CHANNEL_ID;
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
      console.log("Canal não encontrado.");
      reject(new Error("Canal não encontrado."));
      return;
    }

    const fileBuffer = iconUrl.buffer; // Obter o buffer do arquivo

    // Verifique as dimensões da imagem
    sharp(fileBuffer)
      .metadata()
      .then((metadata) => {
        const width = metadata.width;
        const height = metadata.height;

        if (width === 564 && height === 564) {
          // A imagem já possui as dimensões desejadas, não é necessário redimensionar
          console.log("A imagem já possui as dimensões desejadas.");
          return fileBuffer;
        } else {
          // Redimensione a imagem para 564x564
          console.log("Redimensionando a imagem...");
          return sharp(fileBuffer).resize(564, 564).toBuffer();
        }
      })
      .then((imageBuffer) => {
        // Envie a imagem para o canal Discord
        channel
          .send({
            files: [
              {
                attachment: imageBuffer,
                name: iconUrl.originalname,
              },
            ],
          })
          .then((message) => {
            const attachment = message.attachments.first();
            const imageUrl = attachment.url;
            console.log("Imagem enviada com sucesso.");
            tools.iconUrl = imageUrl;
            return tools.save();
          })
          .then(() => {
            console.log("Registrado com sucesso.");
            resolve();
          })
          .catch((error) => {
            console.error("Erro ao enviar a imagem:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Erro ao verificar as dimensões da imagem:", error);
        reject(error);
      });
  });
}

export { regShorts, regTools };