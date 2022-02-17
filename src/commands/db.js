const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, command) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`É necessário ser admin para utilizar esse comando.`);

    message.channel.send("``📌``")
}
exports.help = {
    name: "db",
    description: 'Cria a mensagem do atendimento dos tickets do servidor;'
}