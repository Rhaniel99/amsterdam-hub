// Importação dos módulos do discord.js
import { REST } from 'discord.js';
import { Routes } from 'discord.js';

// Importação do dotenv para configuração das variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Importação dos comandos
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Obter o diretório atual do arquivo
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Agora você pode usar __dirname normalmente
const commandPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
  const { default: command } = await import(`${commandPath}/${file}`);
  commands.push(command.data.toJSON());
}

// Instância REST
const rest = new REST({ version: '10' }).setToken(TOKEN);

// Deploy dos comandos
(async () => {
  try {
    console.log(`Resetando ${commands.length} comandos...`);
    // PUT
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();
