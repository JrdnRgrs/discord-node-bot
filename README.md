# Node Discord Bot
A nodejs powered Discord Bot template to quickly get you started building.

## Features
* Enable/Disable/Reset commands for admins.
* Message Embedding: Option to make bot reply with Discord embeddings
* Message splitter for longer messages that exceed 2000 characters


## Dependencies
* nodejs
* npm
   * dotenv
* [Discord Application Bot](https://discord.com/developers/applications/)

## Setup/Installation
1. Create a [Discord Application Bot](https://discord.com/developers/applications/). You can follow [this](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) tutorial. Copy the bot token somewhere for usage later.
2. Invite the bot to your server. You can follow [this](https://discordjs.guide/preparations/adding-your-bot-to-servers.html) tutorial.
3. Install [NodeJS](https://nodejs.org/) for your system. Refer to Google for installation based on OS.
4. Clone this repo for starter template.
1. Run `npm ci` to install NPM dependencies.
2.  Copy `.env.example` to `.env` and add all bot token and admin IDs into `.env`. Change other options to your liking.
3.  Run node `deploy-commands.js` to deploy the bot's slash commands to discord.
4.  Finally, run `npm start` or `node index.js` to run the bot.
5.  **OPTIONAL** Run the bot in a container if you want to keep your bot active. See [below](#docker) for instructions.

## Usage

### Commands
- `/enable`: Enables the bot.
- `/disable`: Disables the bot.
### Config Environment Variables

- `REPLY_MODE` - Whether or not bot should use Discord replies for messages.
- `BOT_NAME` - Name of the bot.
- `BOT_REPLIES` - Whether or not bot should reply to other bots (but never itself).
- `EMBED_RESPONSE` - Whether or not to use embeds when responding (new features will be developed for true)

These env vars are dynamic based on the personality. Use "\<p>" as a placeholder for the `BOT_NAME`:
- `DYNAMIC_TITLE_MSG` - Bot message for the title of embeds. Will be wrapped in \*\* \*\*.

## Docker
- Ensure your `.env` file exists and is populated with the correct values.
- Run `docker build -t <IMAGE_NAME_> .` to build the image.
- Run `docker-compose up -d` to create a stack. This will mount the .env file to `/app/.env` within the container.

## Credits

This template is based off [this](https://github.com/Kevin8675/ChatGPT-Discord-Bot) original project by [@Kevin8675](https://github.com/Kevin8675). 

I've been slowly adding features on [my own bot](https://github.com/JrdnRgrs/gpt-discord-bot), but thought this was a great starting point for a bot. Thanks!