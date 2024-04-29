// hub.js
import { 
  SlashCommandBuilder, 
  ActionRowBuilder, 
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder, } 
from 'discord.js';

// Função para lidar com a resposta da seleção
async function handleSelection(interaction) {
  const selectedValue = interaction.values[0]; // Assuming only one value is selected
  // Agora você pode fazer o que quiser com o valor selecionado
  console.log('Valor selecionado:', selectedValue);

  // Enviar uma resposta ao usuário com a seleção
  await interaction.reply(`Você selecionou: ${selectedValue}`);
}

export default {
  data: new SlashCommandBuilder()
    .setName("hub")
    .setDescription("apenas um teste"),

  async execute(interaction) {
    // Criação do menu suspenso de seleção de string
    const select = new StringSelectMenuBuilder()
      .setCustomId('starter')
      .setPlaceholder('Make a selection!')
      .addOptions(
        // Opção 1: Bulbasaur
        new StringSelectMenuOptionBuilder()
          .setLabel('Bulbasaur')
          .setDescription('The dual-type Grass/Poison Seed Pokémon.')
          .setValue('bulbasaur'),
        // Opção 2: Charmander
        new StringSelectMenuOptionBuilder()
          .setLabel('Charmander')
          .setDescription('The Fire-type Lizard Pokémon.')
          .setValue('charmander'),
        // Opção 3: Squirtle
        new StringSelectMenuOptionBuilder()
          .setLabel('Squirtle')
          .setDescription('The Water-type Tiny Turtle Pokémon.')
          .setValue('squirtle'),
      );

    // Criação do componente de linha de ação (ActionRow) e adição do menu suspenso
    const row1 = new ActionRowBuilder()
      .addComponents(select);

    // Resposta ao usuário com o menu suspenso
    await interaction.reply({
      content: 'Select a starter Pokémon:',
      components: [row1],
    });

    // Listener para a seleção do menu suspenso
    interaction.client.on('interactionCreate', async (interaction) => {
      if (interaction.isStringSelectMenu() && interaction.customId === 'starter') {
        await handleSelection(interaction);
      }
    });
  },
};
