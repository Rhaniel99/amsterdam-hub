import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import {Tags} from '../models/tags.js';

export default {
  data: new SlashCommandBuilder()
    .setName("tags")
    .setDescription("Retorna a descrição da tag especificada.")
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Nome da tag')
        .setRequired(true)
    ),
    
  async execute(interaction) {
    const tagName = interaction.options.getString('name');
    console.log(tagName);

    // Encontrar a tag no banco de dados
    const tag = await Tags.findOne({ where: { name: tagName } });

    if (tag) {
          // Cria o embed com base nos dados da citação
          const exampleEmbed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle(`${tagName}`)
            .setThumbnail('https://cdn.discordapp.com/attachments/1002635975266144287/1114411146271797370/logotipo-do-github.png')
            .addFields(
              { name: '\u200B', value: '\u200B' },
              { name: 'TESTE', value: `${tag.description}`, inline: true },
            );

          await interaction.reply({ embeds: [exampleEmbed] });
        } else {
          // Se a citação não for encontrada, responde com uma mensagem padrão
          await interaction.reply("Nenhuma citação encontrada com ID igual a 1");
        }
  },
};
