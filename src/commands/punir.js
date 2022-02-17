const { MessageEmbed } = require('discord.js')
const { formatDateBR, formatTimeBR, formatNumber } = require('../utils/dateUtils')


const { toMillis } = require('../utils/timeUtils');

const { isNumber } = require('../utils/methods')

const punishById = (id, punishes) => punishes[id];

const punishesEmbedList = (punishes) => Object.values(punishes).map((item, index) => ` ${formatNumber((index + 1))} » ${item.name}`).join('\n')
const moment = require("moment")
moment.locale("pt-br"); 

module.exports.run = async (client, message, args, command) => {
   
    if (!client.avaliableUsage(message.guild))
        return message.channel.send(`🚫 O bot nesse servidor não foi completamente configurado.`)

    const config = client.configCache.get(message.guild.id);
    let silent = false;

    let member = message.mentions.members.first()
    let embedmember = new MessageEmbed()
    .setAuthor({name:"Algo deu errado!", iconURL: "https://images-ext-2.discordapp.net/external/8vXvakWk4ygthBm5zwifRSd7c_qMTcBxzRZIMuC7T-4/%3Fv%3D1/https/cdn.discordapp.com/emojis/639241131707858955.png"})
    .setDescription("\nVocê precisa mencionar o membro que deseja punir juntamente ao uso do comando! A seguir você poderá escolher um motivo entre os listados.")
    if (!member) return message.channel.send({embeds: [embedmember]})

    const mute = await client.getAccount(member.user, member.guild);
    if (args.length == 2) silent = args[1].includes('-s') ? true : false;
    if (args.length > 2) silent = args[2].includes('-s') ? true : false;
    if (mute.timestamp != 0 && Date.now() > mute.muteTimestamp) member.roles.remove("939067228870021142");
    let embed1 = new MessageEmbed()
    .setAuthor({name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
    .setDescription(`\`\`\`Aplicando punição em: ${member.user.tag}
O membro está no servidor desde ${moment(member.joinedAt).format('LLL')}.\`\`\`
Envie o **ID correspondente ao motivo** da punição que você deseja aplicar!
Quaisquer punições deste comando **são aplicadas no servidor do Discord**, sem quaisquer vínculo com os servidores da rede;
        
\`\`\`[A01]: Banimento permanente.
[A02]: Silenciamento permanente.
  ➥ Motivos disponíveis apenas para administradores ou superiores.

———————————————————————————————————————————————————————————

[01]: Ofensa a membros da equipe.
[02]: Ofensa a jogador/membro.
[03]: Discórdia em bate-papo.
[04]: Divulgação. (Servidores)
[05]: Divulgação. (Links)
[06]: Comércio não autorizado.
[07]: Mensagem falsa/Chat Fake.
[08]: Demais infrações.

———————————————————————————————————————————————————————————

[C01]: Alerta de conduta. -> Não disponível no momento.
[C02]: Banimento permanente. -> Não disponível no momento.
  ➥ Motivos são punições aplicadas para central de suporte.\`\`\`\ 
Envie \`cancelar\` para cancelar a ação que o comando causará sobre o membro, deste modo a punição não será aplicada!`)
.setFooter({text: `${silent ? `⚠️ O modo silencioso está ativo!` : ``}`})
    await message.channel.send({embeds: [embed1]}).then(async msg => {
            const collector = msg.channel.createMessageCollector(a => a.author.id == message.author.id, { time: 10000 * 50, max: 1 });
            if (mute.muteTimestamp != 0 && member.roles.cache.some(r => ["939067228870021142"].includes(r.id))) { 
                message.channel.send(`O jogador \`\`${member.user.username + '#' + member.user.discriminator}\`\`, já está silenciado pelo tempo de \`\`${formatTimeBR(mute.muteTimestamp - Date.now())}\`\``)
            msg.delete()
            collector.stop()};
            collector.on('collect', async (message) => {
                const content = message.content;
                if (content.toLowerCase() != 'cancelar') {
                    const punish = punishById(parseInt(content.toLowerCase()), config.punishes);
                    if (!isNumber(content.toLowerCase()) || (parseInt(content.toLowerCase()) > Object.keys(config.punishes).length) || parseInt(content.toLowerCase < 0) || !punish){
                        message.delete();
                        return;
                    }
                    let embed2 = new MessageEmbed()
                    .setDescription(`Um membro foi punido do servidor de discord recentemente, confira abaixo algumas informações sobre a punição, dentre elas quem aplicou, motivo e membro punido.\n⠀\`\`\`\ Membro punido: ${member.user.tag} \n Motivo da punição: ${punish.name} \n Punição aplicada por: ${message.author.tag} \`\`\`\ `)
                    .setFooter({text: 'A punição foi aplicada ' + formatDateBR(Date.now())});
                    if (!silent)
                        message.guild.channels.cache.get("939068902556708864").send({embeds: [embed2]})
                    client.updateValues(member.user, member.guild, {
                        muteTimestamp: punish.timestamp + Date.now(),
                        punishTimes: 'plus;1'
                    })
                    let embed3 = new MessageEmbed()
                    .setAuthor({name:`Motivo aplicado com sucesso!`, iconURL: `https://gamepedia.cursecdn.com/minecraft_gamepedia/thumb/0/0f/Lime_Dye_JE2_BE2.png/150px-Lime_Dye_JE2_BE2.png?version=689addf38f5c21626ee91ec07e6e8670`})
                    .setDescription(`\nVocê selecionou o motivo \`\`${punish.name}\`\`, o mesmo foi punido com um silenciamento de ${formatTimeBR(punish.timestamp).trim()}.\n\nCaso se repita o mesmo será punido com o banimento permanente do servidor.`)
                    .setFooter({text:`Essa sua ${(mute.punishTimes + 1)}º punição.`})

                    collector.stop();
                    message.channel.send({embeds: [embed3]})
                    member.roles.add("939067228870021142");
                    

                } else {
                    collector.stop();
                    try { await msg.delete() } catch (error) { }
                    let embedcancelar = new MessageEmbed()
                    .setAuthor({name: `Comando cancelado com sucesso!`, iconURL: "https://media.discordapp.net/attachments/632215389354459147/642819938309898241/GTuZVlKhvK5qI8ZbCiCbm0khNQwUTbzC568QwW9Vs7RoqX5lDuwsa8_PCMXVZSG3f9UYYbUgqf56X71WvTayHws400.png"})
                    .setDescription("⠀\nVocê cancelou o comando e nenhum membro será punido, embora tenhamos um monstro sedento de membros para punir.")
                    return message.channel.send({embeds: [embedcancelar]})
                }
            });


        })

}
exports.help = {
    name: 'punir',
roles: ['AJUDANTE', 'MODERADOR', 'ADMIN', 'GERENTE', 'MASTER'],
    description: 'Abre um painel de punição de membros;'
}