const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, command) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`É necessário ser admin para utilizar esse comando.`);


    const config = client.configCache.get(message.guild.id);
    let ping_do_bot = client.ws.ping;

    const embed = new MessageEmbed()
        .setAuthor({name:`Área de atendimento ao jogador.`, iconURL: `https://images-ext-2.discordapp.net/external/712tpa-GYde52lmi4YCiJ7ILeUmHSjK1XgsnyNo2Fd0/%3Fsize%3D128/https/cdn.discordapp.com/emojis/635165156149690429.png`})
        .setDescription("Clique no emoji abaixo para ser redirecionado a criação de seu ticket, o atendimento será realizado por meio de suas mensagens privadas. [Saiba mais!](https://support.discord.com/hc/pt-br/sections/201131318-Mensagem-Privada)")
        .addField("Informações:", `<:polvora:943618313974611968> Agora estamos com **${parseFloat((Object.values(client.tickets).length / config.ticketsCapacity) * 100).toFixed(2)}%** da central em uso.\n<:ping:943618282248884244> Latência: ${ping_do_bot}ms.`)
        .setImage('https://minecraftskinstealer.com/achievement/35/Converse+conosco%21/Clique+no+emoji+abaixo.')
        .setColor(`#36393f`)

    message.channel.send({embeds: [embed]}).then(async msg => {
        await msg.react(`❓`)

    })
}
exports.help = {
    name: "atendimento",
    roles: ['MASTER'],
    description: 'Cria a mensagem do atendimento dos tickets do servidor;'
}