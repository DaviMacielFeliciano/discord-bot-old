const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, command) => {
  if (!client.hasPermission(command, message.member))
    return message.channel.send(`🚫 Você não possui permissão para executar este comando.`).then(async message => { try { setTimeout(() => message.delete(), 2000) } catch (err) { } });
  if (!client.avaliableUsage(message.guild))
    return message.channel.send(`🚫 O bot nesse servidor não foi completamente configurado.`).then(async message => { try { setTimeout(() => message.delete(), 2000) } catch (err) { } });

  const config = client.configCache.get(message.guild.id);

  message.channel.send(new MessageEmbed()
    .setDescription(config.formDescription)
    .setColor(`#36393f`)).then(async message => { try { setTimeout(message.delete(), 6000) } catch (error) { } })

}

exports.help = {
  name: 'formulario',
  roles: ['MEMBRO'],
  description: 'Recebe o formulário para aplicar-se à equipe;'
}