const { ListenerAdapter, ListenerEnums: { READY } } = require('../adapters/ListenerAdapter');

const { formatTimeBR } = require('../utils/dateUtils');

const getRandomRichPresence = (duration, size) => [`🎮| ${size} membros.`, `🤖 | discord.gg/redestone`][Math.floor(Math.random() * 2)]



module.exports = (client) => class BotListeners extends ListenerAdapter{
  constructor() {
    super(client, [READY]);
  }
  async onBotReady() {
    let channel = client.channels.cache.get("939060990937534484")
    channel.send("&dashboard")
    console.log(`\n\x1b[32m✔\x1b[0m  \x1b[46m\x1b[30m discord.js \x1b[0m Bot logged successfully, with ${client.guilds.cache.size} servers e com ${client.users.cache.size} members.`);

    const updatedRichPresence = () => {
      let duration = formatTimeBR(client.uptime).trim();
      let msg = getRandomRichPresence(duration, client.users.cache.size);

      client.user.setActivity(msg, {
        game: {
          type: 1
        }
      });

    }
    setInterval(updatedRichPresence, 1000 * 10);

    client.ticketsGC()
    client.capacityTick();
    client.punishGC();


    client.guilds.cache.forEach(async value => {
      const guild = await client.getGuild(value);
      client.configCache.set(`${value.id}`, guild)
    });

  }
}