const { MessageEmbed } = require('discord.js')

const { toMillis } = require('../utils/timeUtils');

const { formatDateBR } = require('../utils/dateUtils');

const moment = require("moment")
moment.locale("pt-br"); 
const db = require("quick.db")

exports.run = async (client, message, args, command) => {
    let user = message.author
    let embedconfirmacao = new MessageEmbed()

    .setDescription(`O comando foi executado faltando algumas informações em seu uso, para que o comando seja ativado corretamente é necessário informar o nickname, status e o motivo.
    
    \`\`\`Como usar: &rev <nickname> <status> <motivo>
    
 Status da revisão:
  01: Aprovada.
  02: Negada.
  03: Em análise.
      
 Motivo:
  01: Não consta nenhuma punição ativa em sua conta.
  02: A punição foi aplicada incorretamente.
  03: A punição foi aplicada corretamente.
  04: Prazo encerrado.
  05: A revisão continua em análise.\`\`\``)
      .setFooter({text: `Comando usado ${moment().format('LLL')}.`})
    let nick = args[0]
    let status = args[1]
    let motivo = args[2]
    if(!nick || !status || !motivo) return message.channel.send({embeds: [embedconfirmacao]})
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`É necessário ser admin para utilizar esse comando.`);
    if (!client.avaliableUsage(message.guild)) return message.channel.send(`🚫 O bot nesse servidor não foi completamente configurado.`)
    const config = client.configCache.get(message.guild.id);
    if (!config.reviewsEnabled) return message.channel.send(`🚫 A criação de revisões foi desabilitada por um superior.`)

    const appelChannel = await client.guilds.cache.get("939017549822169119").channels.cache.get("939068860244561921");
    if(status == "01"){
        let data = db.get(`revisaodate(${user.id})`)
        if(!db.get(`revisaodate(${user.id})`)) {
            data = db.set(`revisaodate(${user.id})`, `${moment().format('L')}`)
        }
    if(motivo == "01"){
        let revisao = db.add(`revisao(${user.id})`, 1)
        if(revisao === null) revisao = 0;

        let embed = new MessageEmbed()
        .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
        .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Aprovada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
        .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

        let embedrevisao = new MessageEmbed()
        .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
        .setDescription(`Estado atual da revisão: \`Aprovada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: Não consta nenhuma punição ativa em sua conta.\`\`\``)
        .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
         message.channel.send({embeds: [embed]})
         appelChannel.send({embeds: [embedrevisao]})
    }
    
    if(motivo == "02"){
        let revisao = db.add(`revisao(${user.id})`, 1)
        if(revisao === null) revisao = 0;
        let embed = new MessageEmbed()
        .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
        .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Aprovada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
        .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

        let embedrevisao = new MessageEmbed()
        .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
        .setDescription(`Estado atual da revisão: \`Aprovada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A punição foi aplicada incorretamente.\`\`\``)
        .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
         appelChannel.send({embeds: [embedrevisao]})
         message.channel.send({embeds: [embed]})

    }
    if(motivo == "03"){
        let revisao = db.add(`revisao(${user.id})`, 1)
        if(revisao === null) revisao = 0;
        let embed = new MessageEmbed()
        .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
        .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Aprovada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
        .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

        let embedrevisao = new MessageEmbed()
        .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
        .setDescription(`Estado atual da revisão: \`Aprovada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A punição foi aplicada corretamente.\`\`\``)
        .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
         appelChannel.send({embeds: [embedrevisao]})
         message.channel.send({embeds: [embed]})

    }
    if(motivo == "04"){
        let revisao = db.add(`revisao(${user.id})`, 1)
        if(revisao === null) revisao = 0;
        let embed = new MessageEmbed()
        .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
        .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Aprovada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
        .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

        let embedrevisao = new MessageEmbed()
        .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
        .setDescription(`Estado atual da revisão: \`Aprovada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: Prazo encerrado.\`\`\``)
        .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
         appelChannel.send({embeds: [embedrevisao]})
         message.channel.send({embeds: [embed]})

    }
    if(motivo == "05"){
        let revisao = db.add(`revisao(${user.id})`, 1)
        if(revisao === null) revisao = 0;
        let embed = new MessageEmbed()
        .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
        .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Aprovada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
        .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

        let embedrevisao = new MessageEmbed()
        .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
        .setDescription(`Estado atual da revisão: \`Aprovada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A revisão continua em análise.\`\`\``)
        .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
         appelChannel.send({embeds: [embedrevisao]})
         message.channel.send({embeds: [embed]})

    }
}
// ----------------------------------------NEGADA----------------------------------------------
if(status == "02"){
    let data = db.get(`revisaodate(${user.id})`)
    if(!db.get(`revisaodate(${user.id})`)) {
        data = db.set(`revisaodate(${user.id})`, `${moment().format('L')}`)
    }
if(motivo == "01"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Negada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Negada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: Não consta nenhuma punição ativa em sua conta.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}

if(motivo == "02"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Negada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Negada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A punição foi aplicada incorretamente.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
if(motivo == "03"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Negada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Negada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A punição foi aplicada corretamente.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
if(motivo == "04"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Negada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Negada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: Prazo encerrado.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
if(motivo == "05"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Negada pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Negada pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A revisão continua em análise.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
}
// ---------------------------------em analise-------------------------------------------------------
if(status == "03"){
    let data = db.get(`revisaodate(${user.id})`)
    if(!db.get(`revisaodate(${user.id})`)) {
        data = db.set(`revisaodate(${user.id})`, `${moment().format('L')}`)
    }
if(motivo == "01"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Em análise pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Em análise pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: Não consta nenhuma punição ativa em sua conta.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}

if(motivo == "02"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Em análise pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Em análise pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A punição foi aplicada incorretamente.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
if(motivo == "03"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Em análise pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Em análise pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A punição foi aplicada corretamente.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
if(motivo == "04"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Em análise pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Em análise pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: Prazo encerrado.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
if(motivo == "05"){
    let revisao = db.add(`revisao(${user.id})`, 1)
    if(revisao === null) revisao = 0;
    let embed = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`A revisão do membro \`${nick}\` foi avaliada como \`Em análise pela equipe\`.\n[Clique aqui para mais informações sobre a analise da revisão.](https://discord.com/channels/939017549822169119/939068860244561921)`)
    .setFooter({text: `Atualmente você analisou ${revisao} revisões desde ${data}.`})

    let embedrevisao = new MessageEmbed()
    .setAuthor({name: `Resultado de revisão!`, iconURL: "https://images-ext-2.discordapp.net/external/uDoFoXDl4EU9ofJvf_uvIy_J5gt-yNn6b9N0TnUx-lI/%3Fsize%3D128/https/cdn.discordapp.com/emojis/850502809555566652.png"})
    .setDescription(`Estado atual da revisão: \`Em análise pela equipe;\`\n\nUm membro punido no servidor acabou de receber o resultado de sua revisão, confira abaixo algumas informações, dentre elas membro, status e motivo.\n\n\`\`\`Membro: ${nick}
Motivo: A revisão continua em análise.\`\`\``)
    .setFooter({text:`A revisão foi avaliada em ${moment().format('LLL')}`})
 appelChannel.send({embeds: [embedrevisao]})
 message.channel.send({embeds: [embed]})

}
}
}


exports.help = {
    name: 'rev',
    roles: ['ADMINISTRADOR'],
    description: 'Responda a o pedido de revisão de um jogador;'
}