const { MessageEmbed } = require('discord.js')


exports.run = async (client, message, args, command) => {
  if (!client.hasPermission(command, message.member))
    return message.channel.send(`🚫 Você não possui permissão para executar este comando.`)
  if (!client.avaliableUsage(message.guild))
    return message.channel.send(`🚫 O bot nesse servidor não foi completamente configurado.`)

  const config = client.configCache.get(message.guild.id);
  if (!args[0]) {
    message.channel.send({ content: `🚫 Use: ${config.prefix}prefix <prefixo>.` })
    return;
  }
  await message.channel.send({
    embeds: [new MessageEmbed()
      .setThumbnail('https://i.imgur.com/jF1hPnt.png')
      .setAuthor({
        name: config.serverName,
        iconURL: `${client.user.avatarURL() != null ? client.user.avatarURL() : "https://media3.giphy.com/media/chiLb8yx7ZD1Pdx6CF/giphy.gif"}`
      })
      .setDescription(`O prefixo dos comandos foi alterado de \`\`${config.prefix}\`\` para \`\`${args[0]}\`\`;`)
      .setFooter({ text: `Prefixo alterado por ${message.author.username}`, iconURL: message.author.avatarURL }).setTimestamp(Date.now())
      .setColor(`#36393f`)]
  });

  config.prefix = args[0];
  const configuration = await client.updateGuildValues(message.guild, {
    prefix: args[0],
  });
  client.configCache.set(message.guild.id, configuration);

}
exports.help = {
  name: "prefix",
  roles: ['POLAR'],
  description: 'Altera o prefixo dos comandos do servidor;'
}