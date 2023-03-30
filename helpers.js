// Global functions
require('dotenv').config();
const { ADMIN_ID, ENABLE_MSG, DISABLE_MSG, DISABLED_MSG, COMMAND_PERM_MSG, CASE_MODE, REPLY_MODE, BOT_REPLIES, DISABLED_REPLIES, EMBED_RESPONSE, BOT_NAME, DYNAMIC_TITLE_MSG,} = require('./constants');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

// General functions for the bot
// Set admin user IDs
const adminId = ADMIN_ID.split(',');
// Check message author id function
function isAdmin(interaction, msg) {
	//if (msg.member.permissions.has(PermissionFlagsBits.Administrator) || msg.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
    if (msg) {
        if (msg.member.permissions.has(PermissionFlagsBits.Administrator) || msg.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return true;
        } else {
            return adminId.includes(msg.author.id);
        }
    } else if (interaction) {
        if (interaction.member.permissions.has(PermissionFlagsBits.Administrator) || interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return true;
        } else {
            return adminId.includes(interaction.user.id);
        }
    }
}
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
// Split message function
function splitMessage(resp, charLim) {
	const responseNum = Math.ceil(resp.length / charLim);
	const responses = new Array(responseNum);
	// For the number of split responses, if its the last response, make the size the character limit, else make the size the last index of a space that is under 2000 characters
	for (let i = 0, c = 0, chunkSize = null; i < responseNum; i++, c+=chunkSize) {
		if (i + 1 >= responseNum) {
			chunkSize = charLim;
		} else {
					chunkSize = resp.substr(c, charLim).lastIndexOf(" ");
		}
		responses[i] = resp.substr(c, chunkSize);
	}
	return responses;
}

// Reply or respond to a message with given response (not a slash command response), based on REPLY_MODE
function sendCmdResp(msg, cmdResp) {
    if (REPLY_MODE === 'true') {
        msg.reply(cmdResp);
    } else {
        msg.channel.send(cmdResp);
    }
}

// Format the date into [yyyy-MM-DD HH:mm:ss]
function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getMessageEmbed(text, author, isSplit) {
    const dynTitle = isSplit ? ' ' : `**${DYNAMIC_TITLE_MSG.replace('<p>', capitalizeFirstLetter(`${BOT_NAME}`))}**`;
	// create an embed object
	let messageEmbed = new EmbedBuilder()
		.setColor(0x0099FF) // set the color of the embed
        .setTitle(`${dynTitle}`) // set the title of the embed
		.setDescription(text) // set the description of the embed
		.setFooter({ text: `${author.username}#${author.discriminator}` });

	return messageEmbed;
}
module.exports = {
    isAdmin,
    splitMessage,
    sendCmdResp,
    formatDate,
    getMessageEmbed
  };