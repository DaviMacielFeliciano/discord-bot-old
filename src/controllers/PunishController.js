module.exports = client => {
  client.punishGC = () => {
    setInterval(async () => {
      client.configCache.map(async (config, key) => {
        if (!config.isMainServer) return;
        if (!client.avaliableUsage(client.guilds.cache.get(key))) return;
        client.guilds.cache.get("939017549822169119").roles.cache.get("939067228870021142").guild.members.fetch(async member => {
          const mute = await client.getAccount(member.user, member.guild);
          if (mute.muteTimestamp != 0 && Date.now() > mute.muteTimestamp) member.roles.remove("939067228870021142");
        })
      });

    }, 1000 * 60 * 5);
  }
}