const { MessageEmbed, MessageReaction } = require('discord.js');
const { ListenerAdapter, ListenerEnums: { MESSAGE, REACTION_ADD } } = require('../adapters/ListenerAdapter');
const { formatTimer } = require('../utils/dateUtils');
const { minutesToMillis } = require('../utils/timeUtils');
const { isNumber } = require('../utils/methods');
const moment = require("moment")
moment.locale("pt-br"); 

const category1 = async (u) => {
  let embed = new MessageEmbed()
  .setAuthor({name: "Você classificou o seu ticket com sucesso!", iconURL: "https://images-ext-1.discordapp.net/external/_977Vs5DWkOEjxeHvPtyLpbLGmj6byU6Qr-CS4-eT9g/%3Fv%3D1/https/cdn.discordapp.com/emojis/837286890838163477.png"})
  .setDescription(`\`Mensagem enviada para você em: ${moment().format('LLL')}\`\nTodas as mensagens enviadas abaixo serão redirecionadas aos membros responsáveis pela categoria que você o classificou.
  \`\`\`
  +------+----------------------------------------------------+
  |  01  | Caso queira solucionar problemas referentes        
  |      | sservidor, pagamentos ou ativação de produtos.                      
  +------+----------------------------------------------------+\`\`\``)
    await u.send({embeds: [embed]})
  }

module.exports = (client) => class TicketChatListeners extends ListenerAdapter {
  constructor() {
    super(client, [MESSAGE, REACTION_ADD]);
  }

  async onReactionAddListener(reaction, user) {
    if (reaction.message.guild == null) return;
    if (user.bot) return;
    if (!reaction.message.channel.name.includes('📑・suporte')) return;
    reaction.users.remove(user);


    const config = client.configCache.get(reaction.message.guild.id);
    if (!config.ticketsEnabled) {
      try {
        let embed6 = new MessageEmbed()
        .setTitle('Tickets desativados!')
            .setDescription(`${user} o criação de tickets está  \`\`desativada\`\`, aguarde e tente novamente mais tarde!`).setColor('#36393f')
            .setImage('https://minecraftskinstealer.com/achievement/38/Cria%C3%A7%C3%A3o%20de%20tickets:/Desativada')

        const message = await user.send({embeds: [embed6]})
        try { setTimeout(function(){message.delete()}, 3000) } catch (error) { }
      } catch (error) { }
      return;
    }

    const account = await client.getAccount(user, reaction.message.guild);
    if (config.ticketDelay && account.ticketTimestamp != 0 && account.ticketTimestamp > Date.now()) {

      try {
        let embed7 = new MessageEmbed()
        .setTitle('Intervalo para criação de ticket!')
            .setDescription(`${user} Você está em um intervalo de criação de tickets!`).setColor('#36393f')
            .setImage(`https://minecraftskinstealer.com/achievement/17/Aguarde:/${formatTimer(account.ticketTimestamp - Date.now())}`,)
        const message = await user.send({embeds: [embed7]})
        try { setTimeout(function(){message.delete()}, 10000) } catch (error) { }
      } catch (error) { }

      return;
    }

    if (Object.values(client.tickets).length >= config.ticketsCapacity) return;
    const ticketGuild = client.guilds.cache.get(config.attendanceServer);
    if (client.tickets[user.id]) return;

    switch (reaction.emoji.name) {
      case '❓':
                try {
          let embed8 = new MessageEmbed()
          .setAuthor({name: 'Acelere seu atedimento!'})
              .setDescription(`**${user.username}**, você pode clicar no emoji que corresponde a categoria que seu ticket se enquadra para acelerar seu atendimento.\n\n\`\`\`1️⃣| Caso queira solucionar problemas referentes à servidor, pagamentos ou ativação de produtos.\n\n2️⃣| Caso queira retirar suas dúvidas sobre discord, servidor ou website.\n\n3️⃣| Caso queira denunciar um jogador ou algum "bug" em nosso discord, servidor ou website.\n\n4️⃣| Caso queira denunciar algo que tenha relação com membros da equipe.\n\n5️⃣| Caso tenha outros problemas que não tenha sido listado anteriormente.\n ➥ Canais não classificados entram nesta categoria!\`\`\`
              Esse processo de **classificar seu atendimento não é obrigatório**, você pode apenas conversar conosco através das mensagens trocadas aqui mesmo.`)
              .setFooter({text:`Criação de canais de suporte de forma descenessária ou indevida pode gerar punições, é sempre bom dar uma olhadinha em nossas FAQ's.`})
              const mainPainelMessage = await user.send({embeds: [embed8]})
              let lista = [
                "1️⃣",
                "2️⃣",
                "3️⃣",
                "4️⃣",
                "5️⃣"
              ]
              let categorias = [
                "Caso tenha problemas relacionados à pagamentos ou ativação de produtos em nossos servidores.",
                "Caso queira retirar quaisquer dúvidas relacionadas ao discord, servidores ou website.",
                `Caso queira denunciar algum jogador ou algum "bug" em nosso discord, servidores ou website.`,
                "Caso queira fazer quaisquer denúncias que tenham vinculo ou relação com algum membro da equipe.",
                "Caso tenha outros problemas que não tenha sido listados anteriormente.",
              ]
              mainPainelMessage.react("1️⃣")
              mainPainelMessage.react("2️⃣") 
              mainPainelMessage.react("3️⃣") 
              mainPainelMessage.react("4️⃣") 
              mainPainelMessage.react("5️⃣")  

                const filter = (reaction, u) => { return reaction.emoji.name === '1️⃣' && u.id === user.id; }; 
                const filter2 = (reaction, u) => { return reaction.emoji.name === '2️⃣' && u.id === user.id; }; 
                const filter3 = (reaction, u) => { return reaction.emoji.name === '3️⃣' && u.id === user.id; }; 
                const filter4 = (reaction, u) => { return reaction.emoji.name === '4️⃣' && u.id === user.id; }; 
                const filter5 = (reaction, u) => { return reaction.emoji.name === '5️⃣' && u.id === user.id; }; 

                const collector = mainPainelMessage.createReactionCollector({ filter, time: 15000 }); 
                const collector2 = mainPainelMessage.createReactionCollector({ filter2, time: 15000 }); 
                const collector3 = mainPainelMessage.createReactionCollector({ filter3, time: 15000 }); 
                const collector4 = mainPainelMessage.createReactionCollector({ filter4, time: 15000 }); 
                const collector5 = mainPainelMessage.createReactionCollector({ filter5, time: 15000 }); 

                collector.on('collect', async (reaction, u) => { 
                  let embed = new MessageEmbed()
                  .setAuthor({name: `${u.username}`, iconURL: u.displayAvatarURL({ dynamic: true})})
                  .setDescription(`⠀\nTodas as mensagens enviadas neste canal serão redirecionadas aos atendentes responsáveis pela categoria que você o escolheu.`)
                    await u.send({embeds: [embed]})
                })
                client.emojis.find(emoji => emoji.name === "1️⃣") 
            
              
          let embed9 = new MessageEmbed()
          .setTitle('Criando seu ticket')
              .setDescription('Pedimos que você redirecione-se as suas mensagens privadas onde estaremos enviando informações.').setColor('#36393f')
              .setImage(`https://minecraftskinstealer.com/achievement/10/${user.username}/Confira+seu+privado`)

          const message = await reaction.message.channel.send({embeds: [embed9]})
          try { setTimeout(function(){message.delete()}, 3000) } catch (error) { }
        } catch (error) {
          let embed10 = new MessageEmbed()
          .setTitle('Não pudemos criar seu ticket!')
              .setDescription('Pedimos que você ative o envio de mensagem privadas para prosseguir com a criação do ticket.').setColor('#36393f')
              .setImage(
                `https://minecraftskinstealer.com/achievement/6/${user.username}/Sua+DM+está+fechada!`)
          const message = await reaction.message.channel.send({embeds: [embed10]})
          try { setTimeout(function(){message.delete()}, 3000) } catch (error) { }
          return;
        }

        client.tickets[user.id] = {
          channel: null,
          guild: ticketGuild,
          mainGuild: reaction.message.guild,
          user,
          chatPainelMsg: null,
          timestamp: Date.now() + minutesToMillis(1),
          holder: null,
        };
        break;
    }
  }
async onMessageListener(message) {
  if (message.guild !== null || message.author.bot) return;
  if (client.tickets[message.author.id] != null) {
    const ticket = client.tickets[message.author.id];
    const config = client.configCache.get(ticket.mainGuild.id);
    if (!config) return;
    const ticketGuild = client.guilds.cache.get(config.attendanceServer);

    let messageContent = null;
    if(messageContent == `${config.prefix}fechar`) return;
    if(messageContent == `${config.prefix}forcefechar`) return;
    messageContent = message.content;

    if (ticket.channel === null) {
      const ticketChat = await ticketGuild.channels.create(`#${ticket.user.discriminator}`, { type: 'text' });
      if (ticketChat === null) return;
      ticketChat.setParent(config.ticketsCategory);
      ticketChat.setTopic('Canal de ticket!');

      let embed = new MessageEmbed()
      .setAuthor({name:`${ticket.user.username} criou um canal de atendimento.`, iconURL: ticket.user.displayAvatarURL({ dynamic: true})})
      .setDescription(
        `[Canal de atendimento está disponível para todos os atendentes.](https://discord.com/channels/939017603152740352/939060601316081714)\nEste canal foi criado por ${ticket.user.username}#${ticket.user.discriminator} em ${moment().format('LLL')}\`\`\`➜ Categoria indefinida.\`\`\``,)
      .setFooter({text: `ID do canal: ${ticketChat.id}\nID do membro: ${ticket.user.id}`, iconURL: "https://media.discordapp.net/attachments/862371394549055498/866636204140396584/595713996468781112.png"})

      await ticketChat.send({embeds: [embed]})
      ticket.channel = ticketChat;

      try {
        let embed2 = new MessageEmbed()
        .setTitle('Este processo pode demorar alguns segundos!')
          .setDescription('Sua mensagem está sendo encaminhada para a central de tickets, quando recebermos a mensagem você será notificado.')
          .setThumbnail('https://media.discordapp.net/attachments/678369832147615775/688730074077331525/AlertTicket.png')
          .setColor('#f5d442')
        ticket.user.send({embeds: [embed2]}).then( msg => {
          setTimeout(() => {
            let embed5 = new MessageEmbed()
    .setTitle('Recebemos sua mensagem!')
      .setDescription('Sua mensagem chegou em nossa central de tickets, em alguns momentos você receberá uma resposta de nossos atendentes e será notificado novamente;')
      .setThumbnail('https://media.discordapp.net/attachments/678369832147615775/688730080440352823/RespTicket.png')
      .setColor('#42f5cb')
              msg.edit({embeds: [embed5]})
          }, 3000);
      })
      } catch (error) { }
    }
    ticket.timestamp = Date.now() + minutesToMillis(10);

    if (ticket.channel !== null) {
      if (message.attachments.size > 0) {
        if (ticket.channel != null) {
          const attachments = Array.from(message.attachments);

          const attachment = attachments[0][1];

          let embed3 = new MessageEmbed()
          .setAuthor({name: `${ticket.user.username} enviou uma imagem!`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
              .setImage(attachment.proxyURL)

          await ticket.channel.send({embeds: [embed3]});
        }
      } else if (ticket.channel != null) {
        let embed4 = new MessageEmbed()
        .setAuthor({name: `${ticket.user.username} enviou uma mensagem!`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            .setDescription(messageContent)
        await ticket.channel.send({embeds: [embed4]})
      }
    }
  } else {
    try {
      await message.author.send(':x: Você não possui um ticket aberto, logo não computamos esta mensagem!').then(async message => { try { setTimeout(message.delete(), 1500) } catch (error) { } });

    } catch (error) { }
  }
}
}