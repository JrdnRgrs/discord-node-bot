// Global Constants
require('dotenv').config();
const ADMIN_ID = process.env.ADMIN_ID;
const ENABLE_MSG = process.env.ENABLE_MSG ? process.env.ENABLE_MSG : "I am enabled.";
const DISABLE_MSG = process.env.DISABLE_MSG ? process.env.DISABLE_MSG : "I am disabled";
const DISABLED_MSG = process.env.DISABLED_MSG ? process.env.DISABLED_MSG : "Sorry, I am disabled.";
const COMMAND_PERM_MSG = process.env.COMMAND_PERM_MSG ? process.env.COMMAND_PERM_MSG : "Sorry, you don't have the permissions to use that command.";
const REPLY_MODE = process.env.REPLY_MODE ? process.env.REPLY_MODE : "false";
const BOT_REPLIES = process.env.BOT_REPLIES ? process.env.BOT_REPLIES : "false";
const DISABLED_REPLIES = process.env.DISABLED_REPLIES ? process.env.DISABLED_REPLIES : "true";
const EMBED_RESPONSE = process.env.EMBED_RESPONSE ? process.env.EMBED_RESPONSE : "true";
const BOT_NAME = process.env.BOT_NAME ? process.env.BOT_NAME : "BOT";
const DYNAMIC_TITLE_MSG = process.env.DYNAMIC_TITLE_MSG ? process.env.DYNAMIC_TITLE_MSG : "<p> says:";

module.exports = {
    ADMIN_ID,
    ENABLE_MSG,
    DISABLE_MSG,
    DISABLED_MSG,
    COMMAND_PERM_MSG,
    CASE_MODE,
    REPLY_MODE,
    BOT_REPLIES,
    DISABLED_REPLIES,
    EMBED_RESPONSE,
    BOT_NAME,
    DYNAMIC_TITLE_MSG
  };