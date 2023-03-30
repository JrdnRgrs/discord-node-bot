// Requre the necessary discord.js classes
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { DISABLE_MSG } = require('../constants');

module.exports = {
    data: new SlashCommandBuilder()
        // Command details
        .setName('disable')
        .setDescription('Disable the bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction, state) {
        // Commands to execute
        state.isPaused = true;
        await interaction.reply(DISABLE_MSG);
    },
};