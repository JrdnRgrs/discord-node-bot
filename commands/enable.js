// Requre the necessary discord.js classes
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { ENABLE_MSG } = require('../constants');

module.exports = {
    data: new SlashCommandBuilder()
        // Command details
        .setName('enable')
        .setDescription('Enable the bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction, state) {
        // Commands to execute
        state.isPaused = false;
        await interaction.reply(ENABLE_MSG);
    },
};