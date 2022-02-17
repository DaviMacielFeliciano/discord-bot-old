exports.run = async (client, message, args, command) => {
    if (!client.hasPermission(command, message.member))
        return message.channel.send(`🚫 Você não possui permissão para executar este comando.`).then(async message => { try { setTimeout(() => message.delete(), 2000) } catch (err) { } });

    if (!args[0]) return message.reply({ content: "🚫 Use: /limpar <quantidade>." })
    try {
        await message.channel.bulkDelete(args[0])
    } catch (err) { }
}

exports.help = {
    name: "limpar",
    roles: ['MASTER'],
    description: 'Limpa a histórico de mensagens de um canal com um certo alcançe;'
}