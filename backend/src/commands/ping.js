import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com bong!"),
  async execute(interaction) {
    await interaction.reply("pong");
  },
};