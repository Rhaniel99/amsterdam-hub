import { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('showmodal')
    .setDescription('Shows a modal'),

  async execute(interaction) {
    const modal = new ModalBuilder({
      customId: `myModal-${interaction.user.id}`,
      title: 'My Modal',
    });

    const favoriteColorInput = new TextInputBuilder({
      customId: 'favoriteColorInput',
      label: "Qual sua cor favorita?",
      style: TextInputStyle.Short,
    });

    const hobbiesInput = new TextInputBuilder({
      customId: 'hobbiesInput',
      label: "Qual seu hobby favorito?",
      style: TextInputStyle.Paragraph,
    });

    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);

    // Define a filter to handle the modal submission interaction
    const filter = (modalInteraction) => modalInteraction.customId === `myModal-${interaction.user.id}`;

    // Await modal submission
    interaction.client.once('interactionCreate', async (modalInteraction) => {
      if (!filter(modalInteraction)) return;

      const favoriteColorValue = modalInteraction.fields.getTextInputValue('favoriteColorInput');
      const hobbiesValue = modalInteraction.fields.getTextInputValue('hobbiesInput');

      await modalInteraction.reply(`Sua cor favorita é: ${favoriteColorValue} e seu hobby favorito é: ${hobbiesValue}`);
    });
  },
};
