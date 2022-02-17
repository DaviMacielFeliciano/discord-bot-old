const { MessageEmbed } = require('discord.js')
const { minutesToMillis, toMillis, hoursToMillis } = require('../utils/timeUtils');

exports.run = async (client, message, args, command) => {

    if (message.guild === null || message.author.bot) return;
    if (message.channel.topic != 'Canal de ticket!') return;
    const ticket = client.findTicketById(message.channel.id);
    if (ticket == undefined) return;
    if (ticket === null) return;

    let embed = new MessageEmbed()
    .setAuthor({name: `⠀`, iconURL: `https://cdn.discordapp.com/attachments/942884082826756236/942902638142427146/862382666854039603.gif`})
    .setDescription(`**${message.author.username}** (Você!) solicitou o encerramento deste canal.\nO membro terá que esperar 3 horas para criar outro canal de suporte.`)
    .setFooter({text: "Mais informações sobre o encerramento nos logs de registro."})
    .setTimestamp();
    message.channel.send({embeds: [embed]})
    let embedticket = new MessageEmbed()
    .setAuthor({name: `${ticket.user.username} encerrou o seu canal de atendimento!`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription("Um atendente acabou de encerrar seu atendimento, agora espere o fim do tempo de espera para criar outro canal de suporte.")
    .setFooter({text: "Caso tente enviar uma mensagem e seu tempo de espera ainda esteja ativo, será informado o quanto ainda e necessário esperar!"})
    .setTimestamp();
    ticket.user.send({embeds: [embedticket]})
        setTimeout(() => {
        ticket.channel.delete();
        delete client.tickets[ticket.user.id];
        }, 5000);

    const config = client.configCache.get(ticket.mainGuild.id);
    if (config.ticketDelay)
      client.updateValues(ticket.user, ticket.mainGuild, { ticketTimestamp: Date.now() + hoursToMillis(3) });
    }
        exports.help = {
    name: 'fechar',
    aliases: ['send'],
    roles: ['GERENTE']
}