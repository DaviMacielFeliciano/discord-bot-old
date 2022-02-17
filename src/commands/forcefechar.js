const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, command) => {

    const ticket = client.findTicketById(message.channel.id);

    let embed = new MessageEmbed()
    .setAuthor({name: `⠀`, iconURL: `https://cdn.discordapp.com/attachments/942884082826756236/942902638142427146/862382666854039603.gif`})
    .setDescription(`**${message.author.username}** (Você!) forçou o encerramento deste canal.\nO membro não terá que esperar 3 horas para criar outro canal de suporte.`)
    .setFooter({text: "Mais informações sobre o encerramento nos logs de registro."})
    message.channel.send({embeds: [embed]})
    setTimeout(() => {
        message.channel.delete();
    }, 5000);
}
        exports.help = {
    name: 'forcefechar',
    aliases: ['send'],
    roles: ['GERENTE']
}