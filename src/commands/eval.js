
  const Discord = require("discord.js");
  const moment = require("moment")
  moment.locale("pt-br"); 


  exports.run = async (client, message, args, command) => {

    try {
      const evaled = eval(args.join(" "));
      if(!evaled) return message.channel.send("Erro, utilize $eval código.")

      message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
}
exports.help = {
  name: 'eval'
}