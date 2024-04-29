// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import { readdir } from 'fs/promises';
import { join, dirname } from 'path';

// Obtendo o caminho do diretório do módulo atual
const __dirname = dirname(new URL(import.meta.url).pathname);

const commandPath = join(__dirname, '../commands');

// Função assíncrona para ler diretórios e filtrar arquivos
const getCommandFiles = async () => {
  const files = await readdir(commandPath);
  return files.filter((file) => file.endsWith('.js'));
};

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

(async () => {
  const commandFiles = await getCommandFiles(); // Chamada assíncrona

  for (const file of commandFiles) {
    const filePath = join(commandPath, file);
    const command = await import(filePath); // Import dinâmico

    if ("data" in command.default && "execute" in command.default) {
      client.commands.set(command.default.data.name, command.default);
    } else {
      console.log(`Esse comando em ${filePath}`);
    }
  }
})();

// Login Bot e outros eventos
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado!");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar esse comando!");
  }
});

client.login(process.env.TOKEN);

export default client;
