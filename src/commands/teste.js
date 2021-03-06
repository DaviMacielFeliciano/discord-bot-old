const { MessageEmbed } = require('discord.js')

const { formatDateBR } = require('../utils/dateUtils')

const { isNumber } = require('../utils/methods');
const updateEmbedTickets = (message, config) => {
  let embed = new MessageEmbed().setTitle(`Configurações dos tickets!`)
    .setDescription(`De acordo com suas permissões, você pode ativar ou desativar alguns sistemas além de conseguir alterar configurações deste setor.\n\n**Reaja com um emote específico para ação:**\n\n\`\`\`json\n⏰ » Intervalo na criação "${config.ticketDelay ? 'Ativado' : 'Desativado'}"\n⚙ » Criação de tickets "${config.ticketsEnabled ? 'Ativado' : 'Desativado'}"\n🛢 » Capacidade da central "${config.ticketsCapacity + ' tickets'}"\n\n❌ » Encerre o painel do configuração!\`\`\``)
    .setFooter({
      text: `Painel de configuração rápida iniciado em ${formatDateBR(Date.now())}`
    }).setImage(`https://minecraftskinstealer.com/achievement/13/Configura%C3%A7%C3%B5es+tickets%3A/Reaja+com+um+emote%21`)
  message.edit({ embeds: [embed] })
}
const updateEmbedSystems = (message, config) => {

  let embed2 = new MessageEmbed()
    .setTitle(`Configuração de sistemas a parte!`)
    .setDescription(`De acordo com suas permissões, você pode ativar ou desativar alguns sistemas além de conseguir alterar configurações deste setor.\n\n**Reaja com um emote específico para ação:**\n\n\`\`\`json\n🚫 » Criação de denúncias "${config.reportsEnabled ? 'Ativado' : 'Desativado'}"\n👀 » Criação de revisões "${config.reviewsEnabled ? 'Ativado' : 'Desativado'}"\n\n❌ » Encerre o painel do configuração!\`\`\``)
    .setFooter({
      text: `Painel de configuração rápida iniciado em ${formatDateBR(Date.now())}`
    }).setImage(`https://minecraftskinstealer.com/achievement/1/Conf.%20Sistemas%20a%20parte:/Reaja+com+um+emote%21`)
  message.edit({ embeds: [embed2] })

}
const updatedEmbedInternal = (message, config) => {
  let embed3 = new MessageEmbed().setTitle(`Configurações internas!`)
    .setDescription(
      `De acordo com suas permissões, você pode ativar ou desativar alguns sistemas além de conseguir alterar configurações deste setor.\n\n**Reaja com um emote específico para ação:**\n\n\`\`\`json\n⚠ » É o servidor principal? "${config.isMainServer ? 'Sim' : 'Não'}"\n☝ » ID do servidor principal "${config.mainServer ? config.mainServer : 'Não registrado...'}"\n📞 » ID do servidor de atendimento "${config.attendanceServer ? config.attendanceServer : 'Não registrado'}"\n🧾 » Altere a descrição do revisão!\n\n❌ » Encerre o painel do configuração!\`\`\``)
    .setFooter({ text: `Painel de configuração rápida iniciado em ${formatDateBR(Date.now())}` }).setImage(`https://minecraftskinstealer.com/achievement/13/Configura%C3%A7%C3%B5es+tickets%3A/Reaja+com+um+emote%21`)
  message.edit({ embeds: [embed3] })
}


exports.run = async (client, message, args, command) => {
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`É necessário ser admin para utilizar esse comando.`);

  const config = client.configCache.get(message.guild.id);

  let embed = new MessageEmbed()
    .setTitle(`Painel de configuração rápida do servidor!`)
    .setDescription(`De acordo com suas permissões, você pode ativar ou desativar alguns sistemas além de conseguir alterar configurações por este painel.\n\n**Reaja com um emote específico para cada setor:**\n\`\`\`🎫 » Configurações dos tickets!\n🔒 » Configurações internas!\n🔧 » Configuração de sistemas a parte!\n\n❌ » Encerre o painel do configuração!\`\`\``)
    .setFooter({ text: `Painel de configuração rápida iniciado em ${formatDateBR(Date.now())}` }).setImage(`https://minecraftskinstealer.com/achievement/19/Configura%C3%A7%C3%B5es+r%C3%A1pidas%21/Reaja+com+um+emote%21`)
  await message.channel.send({ embeds: [embed] }).then(async msg => {
    try {
      await msg.react('🎫')
      msg.react('🔒')
      msg.react('🔧')
      msg.react('❌')
    } catch (error) { }
    const filter = (reaction, user) => {
      return user.id == message.author.id;
    };

    let currentState = null;
    const reactionCollector = msg.createReactionCollector({ filter, time: 1000 * 60 * 2 });

    reactionCollector.on('collect', async (reaction, user) => {
      switch (reaction.emoji.name) {
        case '❌':
          reaction.message.channel.send(`> 📌 Você cancelou a configuração rápida do servidor!`)
          reaction.message.delete()
          reactionCollector.stop()
          break;
        case '🔒':
          currentState = 'INTERNAL';
          reaction.message.reactions.removeAll();
          let embed2 = new MessageEmbed()
            .setTitle(`Configurações internas!`)
            .setDescription(
              `De acordo com suas permissões, você pode ativar ou desativar alguns sistemas além de conseguir alterar configurações deste setor.\n\n**Reaja com um emote específico para ação:**\n\n\`\`\`json\n⚠ » É o servidor principal? "${config.isMainServer ? 'Sim' : 'Não'}"\n☝ » ID do servidor principal "${config.mainServer ? config.mainServer : 'Não registrado...'}"\n📞 » ID do servidor de atendimento "${config.attendanceServer ? config.attendanceServer : 'Não registrado'}"\n🧾 » Altere a descrição do revisão!\n\n❌ » Encerre o painel do configuração!\`\`\``)
            .setFooter({ text: `Painel de configuração rápida iniciado em ${formatDateBR(Date.now())}` }).setImage(`https://minecraftskinstealer.com/achievement/13/Configura%C3%A7%C3%B5es+tickets%3A/Reaja+com+um+emote%21`)
          msg.edit({ embeds: [embed2] })
          try {
            Promise.all(["⚠", "☝", "📞", "🧾", "❌"].map(emote => msg.react(emote)))

          } catch (error) { }
          break;
        case '⚠':
          reaction.users.remove(user);
          if (currentState == 'INTERNAL') {
            config.isMainServer = !config.isMainServer;
            const configuration = await client.updateGuildValues(message.guild, config);
            client.configCache.set(message.guild.id, configuration);
            updatedEmbedInternal(msg, config)
          }
          break;
        case '☝':
          reaction.users.remove(message.author);
          if (currentState == 'INTERNAL') {
            const filter = m => m.author.id == m.author.id
            const msgPainel = await message.channel.send({ embeds: [new MessageEmbed().setTitle(`Escreva o ID que deseja!`).setDescription(`\nVocê pode escolher o ID do servidor principal.\n\n**OBS:** Para cancelar essa modificação digite \`\`cancelar\`\`.`)] })
            const messageCollector = msgPainel.channel.createMessageCollector({ filter, time: 1000 * 10, max: 1 });
            messageCollector.on('collect', async (collectMessage) => {
              const content = collectMessage.content;
              switch (content.toLowerCase()) {
                case 'cancelar':
                  collectMessage.delete();
                  collectMessage.reply({ content: `> 📌 Você cancelou a alteração da ID do servidor principal!` })
                  try { await msgPainel.delete(); } catch (error) { }
                  break;
                default:
                  collectMessage.delete();
                  messageCollector.stop();
                  config.mainServer = content;
                  const configuration = await client.updateGuildValues(message.guild, config);
                  client.configCache.set(message.guild.id, configuration);
                  updatedEmbedInternal(msg, config)
                  collectMessage.reply({ content: `✅ O ID do servidor principal foi alterado para: ${content}.` })

                  try { await msgPainel.delete(); } catch (error) { }

                  break;
              }
            });

          }
          break;
        case '📞':
          reaction.users.remove(message.author);
          if (currentState == 'INTERNAL') {

            const msgPainel = await message.channel.send({ embeds: [new MessageEmbed().setTitle(`Escreva o ID que deseja!`).setDescription(`\nVocê pode escolher o ID do servidor de atendimento.\n\n**OBS:** Para cancelar essa modificação digite \`\`cancelar\`\`.`)] })

            const filter = m => m.author.id == message.author.id

            const messageCollector = msgPainel.channel.createMessageCollector(filter, { time: 1000 * 10 });
            messageCollector.on('collect', async (collectMessage) => {
              const content = collectMessage.content;
              switch (content.toLowerCase()) {
                case 'cancelar':
                  collectMessage.reply({ content: `> 📌 Você cancelou a alteração da ID do servidor de atendimento!` })
                  collectMessage.delete();
                  messageCollector.stop();
                  try { await msgPainel.delete(); } catch (error) { }
                  break;
                default:
                  collectMessage.delete();
                  messageCollector.stop();
                  config.attendanceServer = content;
                  const configuration = await client.updateGuildValues(message.guild, config);
                  client.configCache.set(message.guild.id, configuration);
                  updatedEmbedInternal(msg, config)
                  collectMessage.reply({ content: `✅ O ID do servidor de atendimento foi alterado para: ${content}.` })

                  try { await msgPainel.delete(); } catch (error) { }

                  break;
              }
            });

          }
          break;
        case '🧾':
          await reaction.users.remove(message.author);
          if (currentState == 'INTERNAL') {

            const msgPainel = await message.channel.send({ embeds: [new MessageEmbed().setTitle(`Escreva a descrição que deseja!`).setDescription(`\nVocê pode escolher a descrição da revisão.\n\n**OBS:** Para cancelar essa modificação digite \`\`cancelar\`\`.`)] })
            const filter = m => m.author.id == message.author.id
            const messageCollector = msgPainel.channel.createMessageCollector(filter, { time: 1000 * 10 });
            messageCollector.on('collect', async (collectMessage) => {
              const content = collectMessage.content;
              switch (content.toLowerCase()) {
                case 'cancelar':
                  msgPainel.reply({ content: `> 📌 Você cancelou a alteração da descrição da revisão!` })
                  collectMessage.delete();
                  messageCollector.stop();
                  try { await msgPainel.delete(); } catch (error) { }
                  break;
                default:
                  collectMessage.delete();
                  messageCollector.stop();
                  config.reviewDescription = content;
                  const configuration = await client.updateGuildValues(message.guild, config);
                  client.configCache.set(message.guild.id, configuration);
                  updatedEmbedInternal(msg, config)
                  collectMessage.reply({ content: `✅ Mensagem de revisão alterada para: ${content}.` })

                  try { await msgPainel.delete(); } catch (error) { }

                  break;
              }
            });
          }
          break;
        case '🎫':
          currentState = 'TICKET';
          msg.reactions.removeAll();
          msg.edit({
            embeds: [new MessageEmbed().setTitle(`Configurações dos tickets!`)
              .setDescription(`De acordo com suas permissões, você pode ativar ou desativar alguns sistemas além de conseguir alterar configurações deste setor.\n\n**Reaja com um emote específico para ação:**\n\n\`\`\`json\n⏰ » Intervalo na criação "${config.ticketDelay ? 'Ativado' : 'Desativado'}"\n⚙ » Criação de tickets "${config.ticketsEnabled ? 'Ativado' : 'Desativado'}"\n🛢 » Capacidade da central "${config.ticketsCapacity + ' tickets'}"\n\n❌ » Encerre o painel do configuração!\`\`\``)
              .setFooter({ text: `Painel de configuração rápida iniciado em ${formatDateBR(Date.now())}` }).setImage(`https://minecraftskinstealer.com/achievement/13/Configura%C3%A7%C3%B5es+tickets%3A/Reaja+com+um+emote%21`)]
          })
          try {
            Promise.all(["⏰", "⚙", "🛢", "❌"].map(emote => msg.react(emote)))

          } catch (error) { }
          break;
        case '🚫':
          reaction.users.remove(user);
          if (currentState == 'OFF_SECTOR') {
            config.reportsEnabled = !config.reportsEnabled;
            const configuration = await client.updateGuildValues(message.guild, config);
            client.configCache.set(message.guild.id, configuration);
            updateEmbedSystems(msg, config)
          }
          break;
        case '👀':
          reaction.users.remove(message.author);
          if (currentState == 'OFF_SECTOR') {
            config.reviewsEnabled = !config.reviewsEnabled;
            const configuration = await client.updateGuildValues(message.guild, config);
            client.configCache.set(message.guild.id, configuration);
            updateEmbedSystems(msg, config)
          }
          break;
        case '🔧':
          currentState = 'OFF_SECTOR';
          msg.reactions.removeAll();
          msg.edit({
            embeds: [new MessageEmbed().setTitle(`Configuração de sistemas a parte!`)
              .setDescription(`De acordo com suas permissões, você pode ativar ou desativar alguns sistemas além de conseguir alterar configurações deste setor.\n\n**Reaja com um emote específico para ação:**\n\n\`\`\`json\n🚫 » Criação de denúncias "${config.reportsEnabled ? 'Ativado' : 'Desativado'}"\n👀 » Criação de revisões "${config.reviewsEnabled ? 'Ativado' : 'Desativado'}"\n\n❌ » Encerre o painel do configuração!\`\`\``)
              .setFooter({ text: `Painel de configuração rápida iniciado em ${formatDateBR(Date.now())}` }).setImage(`https://minecraftskinstealer.com/achievement/1/Conf.%20Sistemas%20a%20parte:/Reaja+com+um+emote%21`)]
          })
          try {
            Promise.all(["🚫", "👀", "❌"].map(emote => msg.react(emote)))

          } catch (error) { }
          break;
        case '⏰':
          reaction.users.remove(message.author);
          if (currentState == 'TICKET') {
            config.ticketDelay = !config.ticketDelay;
            const configuration = await client.updateGuildValues(message.guild, config);
            client.configCache.set(message.guild.id, configuration);
            updateEmbedTickets(msg, config)
          }
          break;
        case '⚙':
          reaction.users.remove(message.author);
          if (currentState == 'TICKET') {
            config.ticketsEnabled = !config.ticketsEnabled;
            const configuration = await client.updateGuildValues(message.guild, config);
            client.configCache.set(message.guild.id, configuration);
            updateEmbedTickets(msg, config)
          }
          break;
        case '🛢':
          reaction.users.remove(message.author);
          if (currentState == 'TICKET') {

            const msgPainel = await message.channel.send({ embeds: [new MessageEmbed().setTitle(`Escreva a quantia que deseja!`).setDescription(`\nVocê pode escolher um limite de tickets, apenas escrevendo o número no chat de __1 até 200__.\n\n**OBS:** Para cancelar essa modificação digite \`\`cancelar\`\`.`)] })
            const messageCollector = msgPainel.channel.createMessageCollector(m => m.author.id == message.author.id, { time: 1000 * 10, max: 1 });
            messageCollector.on('collect', async (collectMessage) => {
              const content = collectMessage.content;
              switch (content.toLowerCase()) {
                case 'cancelar':
                  collectMessage.delete();
                  collectMessage.reply({ content: `> 📌 Você cancelou a alteração da quantidade máxima de tickets!` }).then(async message => { try { setTimeout(message.delete(), 5000) } catch (error) { } })
                  try { await msgPainel.delete(); } catch (error) { }
                  break;
                default:
                  collectMessage.delete();
                  messageCollector.stop();
                  if (isNumber(content) && parseInt(content) <= 200 && parseInt(content) > 0) {
                    const quantity = parseInt(content);
                    config.ticketsCapacity = quantity;
                    const configuration = await client.updateGuildValues(message.guild, config);
                    client.configCache.set(message.guild.id, configuration);
                    updateEmbedTickets(msg, config)
                    collectMessage.reply({ content: `✅ O número máximo de tickets foi alterado para ${content}.` }).then(async message => { try { setTimeout(message.delete(), 1500) } catch (error) { } })

                    try { await msgPainel.delete(); } catch (error) { }
                  } else {
                    collectMessage.reply({ content: `🚫 ${content} não se trata de um número entre 1 e 200.\n\nA alteração foi cancelada \`\`automaticamente\`\`.` }).then(async message => { try { setTimeout(message.delete(), 1500) } catch (error) { } })

                    try { await msgPainel.delete(); } catch (error) { }

                  }
                  break;
              }
            });
          }
          break;
      }
    })

  });


}
exports.help = {
  name: 'teste',
  aliases: ['dshbd'],
  roles: ['Polar'],
  description: 'Abra o painel de configurações rápidas;'
}