const { MessageEmbed } = require('discord.js')

const { formatDateBR } = require('../utils/dateUtils')

const { isNumber } = require('../utils/methods');

exports.run = async (client, message, args, command) => {
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`É necessário ser admin para utilizar esse comando.`);
  const config = client.configCache.get(message.guild.id);
  let channel = client.channels.cache.get(config.dashboardChannel)
  try {
    await client.guilds.cache.get(config.attendanceServer).channels.cache.get(config.dashboardChannel).messages.fetch(config.dashboardMessage).then(msgTICKET => {

  let embed = new MessageEmbed()
  .setDescription(`A seguir estão todas as àreas em que podem ser realizadas alterações, algumas 
  podendo pedir confirmação dependendo do seu grau de importância.
  ⠀`)
  .addField(`**<:papel:943625888631779398> CENTRAL DE SUPORTE**`, `${config.ticketsEnabled ? '<:online:943614473447551046>' : '<:off:943614532809543751>'} | Criação de novos canais de suporte.`, true)
  .addField(`**<:noban:943625874207547413> PUNIÇÕES**`, `${config.punishEnabled ? '<:online:943614473447551046>' : '<:off:943614532809543751>'} | Aplicação de novas punições.`, true)
  .addField(`⠀
**<:canal:943625905333493781> REGISTRO DE ALTERAÇÕES:**`, `-\n⠀`)
  .setFooter({ text: `Todas as alterações realizadas nestes sistema são salvas, pois o mesmo interfere diretamente em todas as funções do sistema. Cuidado com qualquer alteração!`, iconURL: `https://cdn.discordapp.com/emojis/943662394373181452.webp?size=96&quality=lossless`})

  msgTICKET.edit({ embeds: [embed] }).then(async msg => {
    try {
      await msg.react('<:papel:943625888631779398>')
      msg.react('<:noban:943625874207547413>')
      msg.react('<:canal:943625905333493781>')
    } catch (error) { }
    const filter = (reaction, user) => {
      return user.id == message.author.id;
    };

    const reactionCollector = msg.createReactionCollector({ filter });
    reactionCollector.on('collect', async (reaction, user) => {
      switch (reaction.emoji.name) {
          case 'papel':
            reaction.users.remove(user);
              config.ticketsEnabled = !config.ticketsEnabled;
              client.updateGuildValues(message.guild, config);
              client.configCache.set(message.guild.id);
              let embed1 = new MessageEmbed()
  .setDescription(`A seguir estão todas as àreas em que podem ser realizadas alterações, algumas 
  podendo pedir confirmação dependendo do seu grau de importância.
  ⠀`)
  .addField(`**<:papel:943625888631779398> CENTRAL DE SUPORTE**`, `${config.ticketsEnabled ? '<:online:943614473447551046>' : '<:off:943614532809543751>'} | Criação de novos canais de suporte.`, true)
  .addField(`**<:noban:943625874207547413> PUNIÇÕES**`, `${config.punishEnabled ? '<:online:943614473447551046>' : '<:off:943614532809543751>'} | Aplicação de novas punições.`, true)
  .addField(`⠀
**<:canal:943625905333493781> REGISTRO DE ALTERAÇÕES:**`, `-\n⠀`)
  .setFooter({ text: `Todas as alterações realizadas nestes sistema são salvas, pois o mesmo interfere diretamente em todas as funções do sistema. Cuidado com qualquer alteração!`, iconURL: `https://cdn.discordapp.com/emojis/943662394373181452.webp?size=96&quality=lossless`})
  msg.edit({embeds: [embed1]})
            break;
          case 'noban':
            reaction.users.remove(message.author);
             config.punishEnabled = !config.punishEnabled
              client.updateGuildValues(message.guild, config);
              client.configCache.set(message.guild.id);
              let embed2 = new MessageEmbed()
  .setDescription(`A seguir estão todas as àreas em que podem ser realizadas alterações, algumas 
  podendo pedir confirmação dependendo do seu grau de importância.
  ⠀`)
  .addField(`**<:papel:943625888631779398> CENTRAL DE SUPORTE**`, `${config.ticketsEnabled ? '<:online:943614473447551046>' : '<:off:943614532809543751>'} | Criação de novos canais de suporte.`, true)
  .addField(`**<:noban:943625874207547413> PUNIÇÕES**`, `${config.punishEnabled ? '<:online:943614473447551046>' : '<:off:943614532809543751>'} | Aplicação de novas punições.`, true)
  .addField(`⠀
**<:canal:943625905333493781> REGISTRO DE ALTERAÇÕES:**`, `-\n⠀`)
  .setFooter({ text: `Todas as alterações realizadas nestes sistema são salvas, pois o mesmo interfere diretamente em todas as funções do sistema. Cuidado com qualquer alteração!`, iconURL: `https://cdn.discordapp.com/emojis/943662394373181452.webp?size=96&quality=lossless`})
  msg.edit({embeds: [embed2]})
              break;
      }
    })

  });
  
  })

} catch (err){
  message.channel.send(`Houve um erro ao digitar o comando!\n\`\`\`${err}\`\`\``).then( msg => {
    setTimeout(() => {
        msg.delete();
    }, 3000);
})
}
}
exports.help = {
  name: 'dashboard',
  aliases: ['dshbd'],
  roles: ['Polar'],
  description: 'Abra o painel de configurações rápidas;'
}