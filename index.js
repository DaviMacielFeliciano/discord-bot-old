'use-strict'
const { channel } = require("diagnostics_channel");
const Discord  = require("discord.js"); 



const fs = require('fs');
const { config } = require("process");
const db = require('quick.db');
const client = new Discord.Client({ intents: 32767 }); 
client.config = require('./config.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.configCache = new Discord.Collection();
client.rolesCommand = new Discord.Collection();


client.accountTable = new db.table('accounts');
client.configTable = new db.table('configs');

require('./src/controllers/TicketController.js')(client);
require('./src/controllers/PunishController.js')(client);
require('./src/controllers/AccountController.js')(client);
require('./src/controllers/ConfigurationController.js')(client);
require('./src/controllers/PermissionController.js')(client);

fs.readdir('./src/events/', (err, files) => {
  if (err) console.error(err);
  console.log(`\n\x1b[34m⟳\x1b[0m  \x1b[46m\x1b[30m discord.js \x1b[0m Trying to load listeners.\n`);
  files.filter((f) => f.split('.').pop() == 'js').forEach((file) => {
    const Listener = require(`./src/events/${file}`)(client);
    console.log(`\x1b[33m  ⤷\x1b[0m ${file} loaded`);
    const lis = new Listener();
    lis.registerListeners();
  });
});

fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`\n\x1b[34m⟳\x1b[0m  \x1b[46m\x1b[30m discord.js \x1b[0m Trying to load commands.\n`);
  files.filter((f) => f.split('.').pop() == 'js').forEach((file) => {
    const props = require(`./src/commands/${file}`);
    console.log(`\x1b[33m  ⤷\x1b[0m ${file} loaded`);
    client.commands.set(props.help.name, props);
    client.rolesCommand.set(props.help.name, (props.help.roles ? props.help.roles : 'allowed'))
    if (props.help.aliases) {
      props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    }
  });
});



client.login(client.config.token);


