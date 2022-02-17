const { MessageEmbed } = require('discord.js');
const { ListenerAdapter, ListenerEnums: { MESSAGE, REACTION_ADD } } = require('../adapters/ListenerAdapter');

const { formatDateBR } = require('../utils/dateUtils');

const { minutesToMillis, toMillis, hoursToMillis } = require('../utils/timeUtils');

module.exports = (client) => class TicketStaffChatListeners extends ListenerAdapter {
  constructor() {
    super(client, [MESSAGE, REACTION_ADD]);
  }

  async onMessageListener(message) {
    if (message.guild === null || message.author.bot) return;
    if (message.channel.topic != 'Canal de ticket!') return;
    const config = client.configCache.get(message.guild.id);
    const ticket = client.findTicketById(message.channel.id);
    if (ticket == undefined) return;
    if (ticket === null) return;

      ticket.timestamp = Date.now() + minutesToMillis(10);

      if (message.attachments.size > 0) {
        try {
          const attachments = Array.from(message.attachments);

          const attachment = attachments[0][1];
          await ticket.user.send({
            embeds: [new MessageEmbed()
              .setAuthor({name:`${message.author.username} enviou uma imagem!`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
              .setImage(attachment.proxyURL)]
          });
        } catch (error) { }
      } else {
        try {
          if(message.content == `${config.prefix}fechar`) return;
          await ticket.user.send({
            embeds: [new MessageEmbed()
              .setAuthor({name:`${message.author.username} enviou uma mensagem!`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
              .setDescription(message.content)]
          });
        } catch (error) { }
      }
      if (ticket.channel != null) {
        message.delete()
        if(message.content == `${config.prefix}fechar`) return;
        await ticket.channel.send({
          embeds: [new MessageEmbed()
            .setAuthor({name:`${message.author.username} enviou uma mensagem!`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            .setDescription(message.content)]
        })
      }
   } 
}