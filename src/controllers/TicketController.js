const { MessageEmbed } = require('discord.js')

const { formatDateBR } = require('../utils/dateUtils');

const { hoursToMillis, minutesToMillis, daysToMillis } = require('../utils/timeUtils');

module.exports = client => {
  client.tickets = [],

    client.deleteTicket = async (ticket, embed) => {
      try {
        if (ticket.holderMessage !== null) ticket.holderMessage.delete();
        if (ticket.channel !== null) ticket.channel.delete();
        delete client.tickets[ticket.user.id];
        try {
          await ticket.user.send({ embeds: [embed] })
        } catch (error) { }
      } catch (err) { }

    },
    client.capacityTick = () => {

      setInterval(async () => {
        client.configCache.map(async (config, key) => {
          if (!config.isMainServer) return;
          if (!client.avaliableUsage(client.guilds.cache.get(key))) return;
          if (!client.guilds.cache.get(config.mainServer)) return;
          if (!client.guilds.cache.get(config.mainServer).channels.cache.get(config.attendancePainelChannel)) return;
          await client.guilds.cache.get(config.mainServer).channels.cache.get(config.attendancePainelChannel).messages.fetch(config.attendancePainelMessage).then(message => {
            const embed = new MessageEmbed()
            .setAuthor({name:`Área de atendimento ao jogador.`, iconURL: `https://images-ext-2.discordapp.net/external/712tpa-GYde52lmi4YCiJ7ILeUmHSjK1XgsnyNo2Fd0/%3Fsize%3D128/https/cdn.discordapp.com/emojis/635165156149690429.png`})
            .setDescription("Clique no emoji abaixo para ser redirecionado a criação de seu ticket, o atendimento será realizado por meio de suas mensagens privadas. [Saiba mais!](https://support.discord.com/hc/pt-br/sections/201131318-Mensagem-Privada)")
            .addField("Informações:", `<:polvora:943618313974611968> Agora estamos com **${parseFloat((Object.values(client.tickets).length / config.ticketsCapacity) * 100).toFixed(2)}%** da central em uso.\n<:ping:943618282248884244> Latência: ${ping_do_bot}ms.`)
            .setImage('https://minecraftskinstealer.com/achievement/35/Converse+conosco%21/Clique+no+emoji+abaixo.')
            .setColor(`#36393f`)
            message.edit({embeds: [embed]})
          });
        })


      }, 1000 * 60);
    },
    client.ticketsGC = () => {
      setInterval(async () => {
        Object.values(client.tickets).filter(result => result.timestamp < Date.now()).forEach(result => {
          client.deleteTicket(result, new MessageEmbed()
            .setTitle('Você teve seu ticket fechado automaticamente!')
            .setDescription(`Seu ticket foi encerrado em nossa central por: \`\`ausência\`\`\n\n${result.holder == null ? `Você poderá criar um novo ticket sem nenhum intervalo de tempo, visto que não havia nenhum atendente com seu ticket;` : `Você terá que esperar \`\`3 horas\`\`\ para criar outro ticket para nós`}\nIsso ocorre com todos os tickets fechados em nossa central.\n\nFechado em: \`\`${formatDateBR(Date.now())}\`\``)
            .setThumbnail(`https://media.discordapp.net/attachments/678369832147615775/688730074077331525/AlertTicket.png`)
            .setColor(`#f5d442`))
          const config = client.configCache.get(result.mainGuild.id);
          if (result.holder != null && config.ticketDelay)
            client.updateValues(result.user, result.mainGuild, {
              ticketTimestamp: Date.now() + hoursToMillis(3)
            })

        })
      }, minutesToMillis(2));
    },
    client.findTicketById = (id) => {
      return Object.values(client.tickets).filter(result => result.channel != null).filter(result => result.channel.id === id)[0];
    }
}