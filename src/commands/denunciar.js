const { MessageEmbed } = require('discord.js')

const { formatDateBR } = require('../utils/dateUtils')

exports.run = async (client, message, args, command) => {
  if (!client.hasPermission(command, message.member))
    return message.channel.send(`🚫 Você não possui permissão para executar este comando.`).then(async message => { try { setTimeout(() => message.delete(), 2000) } catch (err) { } });
  if (!client.avaliableUsage(message.guild))
    return message.channel.send(`🚫 O bot nesse servidor não foi completamente configurado.`).then(async message => { try { setTimeout(() => message.delete(), 2000) } catch (err) { } });

  const report = {}

  const config = client.configCache.get(message.guild.id);

  if (!config.reportsEnabled) {
    return message.channel.send(`🚫 A criação de denúncias foi desabilitada por um superior.`).then(async message => { try { setTimeout(() => message.delete(), 2000) } catch (err) { } });
  }
  const msg = await message.channel.send({
    embeds: [new MessageEmbed()
      .setAuthor({ name: `${message.author.username}`, iconURL: `https://media2.giphy.com/media/ME2ytHL362EbZksvCE/giphy.gif` })
      .setDescription(`Informe o nickname do jogador que deseja denúnciar.\nCaso forneça um nickname falso poderá ser punido!`)]
  })
  const collector = message.channel.createMessageCollector(a => a.author.id == message.author.id, { time: 1000 * 20, max: 2 });
  collector.on('collect', async (message) => {
    message.delete();
    if (!report.reported) {
      report.reported = message.content;
      await msg.edit({
        embeds: [new MessageEmbed()
          .setAuthor({ name: `${message.author.username}`, iconURL: `https://media2.giphy.com/media/ME2ytHL362EbZksvCE/giphy.gif` })
          .setDescription(`Jogador à ser denunciado: **${report.reported}**\n\nInforme agora um motivo ou prova para compor sua denúncia;\nNós aceitamos \`\`links, de imagens ou vídeos\`\` como provas.`)]
      })
    } else {
      report.reason = message.content;
      await msg.edit({
        embeds: [new MessageEmbed()
          .setAuthor({ name: `${message.author.username}`, iconURL: `https://media2.giphy.com/media/ME2ytHL362EbZksvCE/giphy.gif` })
          .setDescription(`Jogador à ser denunciado: **${report.reported}**\nMotivo/prova da denúncia: **${report.reason}**\n\nSua denúncia foi criada com sucesso, em instantes ela será encaminhada para nossa equipe, onde ela será analisada.\n`).setFooter({ text: 'Denúncia feita em ' + formatDateBR(Date.now()) })]
      })
      const ID1 = "939017549822169119" 
      const ID2 = "942863972628066424"
      const reportChannel = await client.guilds.cache.get(ID1).channels.cache.get(ID2);      
      let embed = new MessageEmbed()
      .setAuthor({
        name: `${message.author.username}#${message.author.discriminator} - Nova denúncia!`,
        iconURL: `https://media0.giphy.com/media/geKGJ302nQe60eJnR9/giphy.gif`
      }).setColor('#ff2a00').setThumbnail(`https://minotar.net/avatar/${report.reported.replace(' ', '+')}`)
      .setDescription(`|| @everyone ||\nJogador denunciado: **${report.reported}**\nMotivo/prova da denúncia: **${report.reason}**`).setFooter({ text: 'Denúncia feita em ' + formatDateBR(Date.now()) })
    
      reportChannel.send({embeds: [embed]}).then(m => {
        m.react('✅')
        m.react('❌')
      })

    }


  });

}
exports.help = {
  name: 'denunciar',
  aliases: ['report'],
  description: 'Envie uma denúncia sobre um jogador para nossa equipe;'
}