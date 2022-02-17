const { MessageEmbed, MessageAttachment } = require('discord.js')
const { downloadFile } = require('../utils/fileUtils')
const { formatDateBR } = require('../utils/dateUtils')

const { sleep } = require('../utils/fileUtils')

const fs = require('fs')
const { connect } = require('http2')


exports.run = async (client, message, args, command) => {
  const config = client.configCache.get(message.guild.id);
  let args1 = args[0]
  if(!args1) return message.channel.send(`${config.prefix}config dashboardMessage/dashboardChannel/attendancePainelMessage/server`)
  if(args1 === "dashboardMessage") {
    const filter = m => m.author.id == m.author.id
            const msgPainel = await message.channel.send({ embeds: [new MessageEmbed().setTitle(`Escreva o ID que deseja!`).setDescription(`\nVocê pode escolher o da mensagem do comando dashboard.\n\n**OBS:** Para cancelar essa modificação digite \`\`cancelar\`\`.`)] })
            const messageCollector = msgPainel.channel.createMessageCollector({ filter, time: 1000 * 10, max: 1 })
            messageCollector.on('collect', async (collectMessage) => {
              const content = collectMessage.content;
              switch (content.toLowerCase()) {
                case 'cancelar':
                  messageCollector.stop();
                  msgPainel.delete()
                  collectMessage.reply({ content: `> 📌 Você cancelou a alteração do canal do comando dashboard.` }).then( msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                  })
                    collectMessage.delete()
                  break;
                  default:
                    messageCollector.stop();
                    config.dashboardMessage = content;
                    const configuration = await client.updateGuildValues(message.guild, config);
                    client.configCache.set(message.guild.id, configuration);
                    message.channel.send({ content: `✅ O ID da mensagem do comando dashboard foi alterado para: ${content}.` }).then( msg => {
                      setTimeout(() => {
                          msg.delete();
                      }, 5000);
                  })
                    msgPainel.delete()
                    collectMessage.delete()
                    break;
      }
   })
  }
  if(args1 === "dashboardChannel") {
    const filter = m => m.author.id == m.author.id
            const msgPainel = await message.channel.send({ embeds: [new MessageEmbed().setTitle(`Escreva o ID que deseja!`).setDescription(`\nVocê pode escolher o canal do comando dashboard.\n\n**OBS:** Para cancelar essa modificação digite \`\`cancelar\`\`.`)] })
            const messageCollector = msgPainel.channel.createMessageCollector({ filter, time: 1000 * 10, max: 1 })
            messageCollector.on('collect', async (collectMessage) => {
              const content = collectMessage.content;
              switch (content.toLowerCase()) {
                case 'cancelar':
                  messageCollector.stop();
                  msgPainel.delete()
                  collectMessage.reply({ content: `> 📌 Você cancelou a alteração do ID da mensagem do comando dashboard.` }).then( msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
                collectMessage.delete()
                  break;
                  default:
                    messageCollector.stop();
                    config.dashboardChannel = content;
                    const configuration = await client.updateGuildValues(message.guild, config);
                    client.configCache.set(message.guild.id, configuration);
                    message.channel.send({ content: `> ✅ O ID da mensagem do comando dashboard foi alterado para: ${content}.` }).then( msg => {
                      setTimeout(() => {
                          msg.delete();
                      }, 5000);
                  })
                  collectMessage.delete()
                    msgPainel.delete()
                    break;
      }
   })
  }
  if(args1 === "attendancePainelMessage") {
    const filter = m => m.author.id == m.author.id
            const msgPainel = await message.channel.send({ embeds: [new MessageEmbed().setTitle(`Escreva o ID que deseja!`).setDescription(`\nVocê pode escolher o da mensagem do comando dashboard.\n\n**OBS:** Para cancelar essa modificação digite \`\`cancelar\`\`.`)] })
            const messageCollector = msgPainel.channel.createMessageCollector({ filter, time: 1000 * 10, max: 1 })
            messageCollector.on('collect', async (collectMessage) => {
              const content = collectMessage.content;
              switch (content.toLowerCase()) {
                case 'cancelar':
                  messageCollector.stop();
                  msgPainel.delete()
                  collectMessage.reply({ content: `> 📌 Você cancelou a alteração da mensagem do atendimento!` }).then( msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                  })
                    collectMessage.delete()
                  break;
                  default:
                    messageCollector.stop();
                    config.attendancePainelMessage = content;
                    const configuration = await client.updateGuildValues(message.guild, config);
                    client.configCache.set(message.guild.id, configuration);
                    message.channel.send({ content: `> ✅ O ID da mensagem do atendimento foi alterado para: ${content}.` }).then( msg => {
                      setTimeout(() => {
                          msg.delete();
                      }, 5000);
                  })
                    msgPainel.delete()
                    collectMessage.delete()
                    break;
      }
   })
  }
  if(args1 === "server"){
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(`Você não tem permissão para usar este comando`);
  const guild = await client.getGuild(message.guild);
  const mappedGuild = Object.values(guild).filter(result => result != null);

  let embed = new MessageEmbed()
    .setAuthor({ name: `Atualização de configurações`, iconURL: `https://media2.giphy.com/media/ME2ytHL362EbZksvCE/giphy.gif` })
    .setFooter({ text: `Tentativa de configuração iniciada em ${formatDateBR(Date.now())}` })
    .setColor('#ffd500')
    .setImage(`https://minecraftskinstealer.com/achievement/11/${message.author.username}/Envie+um+arquivo+.json%21`)
    .setDescription(`\n\nVocê iniciou a **configuração** do servidor:\`\`\`fix\n${message.guild.name} ● (${parseFloat((mappedGuild.length / Object.keys(client.defaultConfigBody).length) * 100).toFixed(2).replace('.00', '') + '% configurado)'} \`\`\`\nComo existem muitas opções de customização, achamos mais cômodo você envia-lás por um arquivo __**json**__, caso você queira algum arquivo de base [clique aqui](https://bit.ly/2Orv3nX).\n\nReaja com  ❌  para cancelar, ou aguarde \`\`20s\`\` para **cancelar automaticamente**.\n\nDeseja baixar as configurações atuais? reaja com 🧾!`)

  const msg = await message.channel.send({ embeds: [embed] })

  Promise.all(["🧾", "❌"].map(emote => msg.react(emote)))
  const filter = (reaction, user) => {
    return user.id == message.author.id && (reaction.emoji.name == '❌' || reaction.emoji.name == '🧾');
  };


  const collector = msg.channel.createMessageCollector(a => a.author.id == message.author.id, { time: 1000 * 20, max: 1 });
  const collectorReaction = msg.createReactionCollector({ filter, time: 1000 * 20, max: 1 });


  collectorReaction.on('collect', async (reaction) => {
    const emoji = reaction.emoji.name
    collectorReaction.stop()
    collector.stop();
    msg.delete()
    switch (emoji) {
      case '❌':
        msg.channel.send(`> 📌 Você cancelou a configuração do servidor!`)
        break;
      case '🧾':
        message.channel.send(`> 📌 Você baixou as configurações atuais do servidor!`)
        fs.writeFileSync(`./server_settings.json`, JSON.stringify(await client.getGuild(message.guild), null, '\t'), 'utf8')
        const attachment = new MessageAttachment('./server_settings.json');
        message.channel.send({
          files: [attachment]
        }).then(async message => { try { setTimeout(() => message.delete(), 60 * 1000) } catch (error) { } })
        await sleep(500);
        fs.unlinkSync('./server_settings.json');
        break;
    }
  });

  collector.on('collect', async (collectMessage) => {
    const file = collectMessage.attachments.first();
    collector.stop();
    collectorReaction.stop();

    if (file) {
      if (!file.name.endsWith('.json')) {
        collectMessage.reply({ content: `🚫 Arquivo inválido! ${file.name} deve ser um arquivo .json!` })
        return;
      }
      const fileName = `${Date.now()}_settings.json`
      try {

        const json = await downloadFile(file.attachment, 'tmp', fileName)
        const configuration = await client.updateGuildValues(collectMessage.guild, json);
        client.configCache.set(collectMessage.guild.id, configuration);


        const composeChanges = () => {
          if (Object.keys(json).length == 0) { return `\`\`\`css\n[Não há alterações]\`\`\`` }

          if (Object.keys(json).length <= 5) {
            return `\`\`\`json\n${Object.keys(json).map(key => `✔ "${key}"`).join('\n')}\`\`\``
          } else {
            return `\`\`\`json\n${Object.keys(json).slice(0, 5).map(key => `✔ "${key}"`).join('\n')}\n\noutros ${Object.keys(json).length - 5}...\`\`\``
          }
        }

        msg.reactions.removeAll()
        let embed2 = new MessageEmbed()
          .setAuthor({ name: `Configurações atualizadas!`, iconURL: `https://media3.giphy.com/media/chiLb8yx7ZD1Pdx6CF/giphy.gif` })
          .setColor('#00f7ff')
          .setImage(`https://minecraftskinstealer.com/achievement/2/Foram+feitas/${Object.keys(json).length}+${Object.keys(json).length < 2 ? 'alteração' : 'alterações'}`)
          .setDescription(`\n\nVocê alterou as ** configurações ** do servidor: \`\`\`css\n${collectMessage.guild.name} \`\`\``).addField('**Alterações realizadas:**', `${composeChanges()}`)

        msg.edit({ embeds: [embed2] })

        try { collectMessage.delete(); } catch (error) { }

      } catch (err) {
        collectMessage.reply({ content: `🚫 Arquivo inválido! ${file.name} não contem o formato padrão de um arquivo .json.` })
      }

    } else {
      try {
        msg.delete()
        collectMessage.reply({ content: '🚫 Não existe nenhum arquivo nessa mensagem enviada.' })
      } catch (ignore) { }
    }
  });
  }
}
exports.help = {
  name: 'config',
  roles: ['MASTER'],
  description: 'Abre um painel de configurações do servidor;'
}