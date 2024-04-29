// hub.js
import { 
  SlashCommandBuilder, 
  ActionRowBuilder, 
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder, } 
from 'discord.js';
import {Shortcuts, Tools} from '../models/hub.js';

// Função para lidar com a resposta da seleção
async function handleSelection(interaction) {
  const selectedValue = interaction.values[0]; // Assuming only one value is selected
  const tool = await Tools.findOne({ where: { id: selectedValue } });
  const shortcuts = await Shortcuts.findAll({
    where: { ToolId: selectedValue },
  });
  const embedCommand = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle(`Lista de Commandos`)
    .setAuthor({
      name: `${tool.name.charAt(0).toUpperCase()}${tool.name
        .slice(1)
        .toLowerCase()}`,
      iconURL: tool.iconUrl,
    })
    .setThumbnail(tool.iconUrl);
  embedCommand.addFields({ name: "\u200B", value: "\u200B" });
  shortcuts.forEach((command) => {
    embedCommand.addFields({
      name: command.command,
      value: command.name,
      inline: false,
    });
  }); 
  embedCommand
    .setTimestamp()
    .setFooter({
      text: "Criado by: Rhanikas",
      iconURL: tool.iconUrl,
    });
  // Verificar se há tags
  if (shortcuts.length === 0) {
    embedCommand.setDescription("Nenhuma tag encontrada.");
  }
  // Responder com o embed
  await interaction.reply({ embeds: [embedCommand] });
}

export default {
  data: new SlashCommandBuilder()
    .setName("comandos")
    .setDescription("Atalhos e comandos para diversas ferramentas!"),

  async execute(interaction) {
    const toolsList = await Tools.findAll({ attributes: ["name", "id", "desc"] });
    // Criar um array para armazenar as opções suspensas
    const selectOptions = [];
    // Iterar sobre a lista de ferramentas e adicionar uma opção suspensa para cada uma
    toolsList.forEach((tool) => {
      selectOptions.push(
        new StringSelectMenuOptionBuilder()
          .setLabel(tool.name) // Usar o nome da ferramenta como o rótulo da opção
          .setDescription(tool.desc) // Descrição opcional
          .setValue(tool.id.toString()) // Convertendo o ID para string
      );
    });

    // Criação do menu suspenso de seleção de string
    const select = new StringSelectMenuBuilder()
      .setCustomId("starter")
      .setPlaceholder("Selecione:")
      .addOptions(selectOptions); // Adicionar as opções suspensas ao menu

    // Criação do componente de linha de ação (ActionRow) e adição do menu suspenso
    const row1 = new ActionRowBuilder().addComponents(select);

    // Resposta ao usuário com o menu suspenso
    await interaction.reply({
      content: "Selecione uma ferramenta:",
      components: [row1],
    });

    // Listener para a seleção do menu suspenso
    interaction.client.on("interactionCreate", async (interaction) => {
      if (
        interaction.isStringSelectMenu() &&
        interaction.customId === "starter"
      ) {
        await handleSelection(interaction);
      }
    });
  },
};
