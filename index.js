// Require the necessary node classes
const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
// Initialize .env config file
require('dotenv').config();
// Import functions and const
const { isAdmin, splitMessage, sendCmdResp, formatDate, getMessageEmbed } = require('./helpers');
const { DISABLED_MSG, CASE_MODE, REPLY_MODE, BOT_REPLIES, DISABLED_REPLIES, EMBED_RESPONSE } = require('./constants');


// Create a new Discord client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Initialize Commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Initialize command files
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
  
  // Console log when logged in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
// Create state array
let state = {
    isPaused: false,
};
  
// Listen for interactions/Commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    const command = interaction.client.commands.get(interaction.commandName);
  
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    // Execute the command and log errors if they appear
    try {
      await command.execute(interaction, state);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
});
  
client.on('messageCreate', async msg => {
    // Don't do anything when message is from self or bot depending on config
	if (BOT_REPLIES === 'true') {
		if (msg.author.id === client.user.id) return;
	} else {
		if (msg.author.bot) return;
	}

    // Check if bot disabled/enabled
	if (state.isPaused === true && !isAdmin(null, msg)) {
		if(DISABLED_REPLIES === "true"){
			sendCmdResp(msg, DISABLED_MSG);
			return;
		} else {
			return;
		}
	}

    try {
		// Start typing indicator
		msg.channel.sendTyping();
		console.log(`[${formatDate(new Date())}] Processing message...`);

		// Your message processing logic here
		// const response = ...

		console.log(`[${formatDate(new Date())}] Message processed.`);
        // Split response if it exceeds the Discord 2000 character limit
		const responseChunks = splitMessage(response, 2000)

		for (let i = 0; i < responseChunks.length; i++) {
			let full_msg;
			if(EMBED_RESPONSE){
				const isSplit = responseChunks.length > 1 && i > 0;
				const msgEmbed = getMessageEmbed(responseChunks[i], msg.author, isSplit);
				full_msg = {embeds: [msgEmbed]};
			}else{
				full_msg = responseChunks[i];
			}
			
			if (REPLY_MODE === 'true' && i === 0) {
				msg.reply(full_msg);
			} else {
				msg.channel.send(full_msg);
			}
		}

	} catch (error) {
		console.error(`[${formatDate(new Date())}] Message processing failed:`, error);
		return;
	}
});
  
// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);