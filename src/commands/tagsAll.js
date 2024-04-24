const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Tags = require("../models/tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tags-all")
    .setDescription("Retorna a descrição de todas as tags."),
    
  async execute(interaction) {
    const tagList = await Tags.findAll({ attributes: ['name', 'description'] });

    // Criar um novo EmbedBuilder
    const embedTags = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Lista de Tags');

    // Adicionar um campo em branco
    embedTags.addFields({ name: '\u200B', value: '\u200B' });

    // Adicionar os campos para cada tag usando map
    tagList.forEach(tag => {
        embedTags.addFields(
        { name: tag.name, value: tag.description, inline: true } 
      );
    });

    // Verificar se há tags
    if (tagList.length === 0) {
        embedTags.setDescription('Nenhuma tag encontrada.');
    }
    // Responder com o embed
    await interaction.reply({ embeds: [embedTags] });
},
};
