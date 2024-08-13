import { url } from "inspector";
import { text } from "stream/consumers";
import { callback } from "telegraf/typings/button";
import { Telegraf, Markup } from "telegraf";
import { subscribe } from "diagnostics_channel";

// Import the necessary packages
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
// const http = require('http');

// Create a new Express app
// const app = express();
// Load environment variables
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
console.log("Bot token:", token); // Confirm token is loaded

// Create a new Telegram bot using polling to fetch new updates
// const bot = new TelegramBot(token, { polling: true });
const bot = new TelegramBot(token, { polling: true, request: {
    agentOptions: {
        keepAlive: true,
        family: 4
    }
}});

// Assign telegram channel id
const groupUsername = process.env.GROUP_USERNAME;
const channelUsername = process.env.CHANNEL_USERNAME;
const twitter = process.env.TWITTER_ID;

let groupId: number = 0;
let channelID: number = 0;
let twitterID: number = 0;

let USER_ID: number = 0;
let USER_NAME: string = "Leo_mint";
let chatId: number = 0;

const BotMenu = [
  { command: "start", description: "Welcome" },
  { command: "help", description: "Help" },
  { command: "setting", description: "Setting" }
];

// Define the inline keyboard layout for interaction
const options = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Play in 1 click  🐉",
          web_app: {
            url: "https://erne.depay.io/"
          }
        }
      ]
    ]
  }
};

bot.setMyCommands(BotMenu);

// Handle the /start command
bot.onText(/\/start/, (msg: any) => {
  chatId = msg.chat.id;
  const userID = msg.from.id;
  // USER_ID = chatId;

  console.log("--//---myChatID----//---", chatId);

  const welcomeMessage = "Hello! Welcome to the Erne Legacy Bot!";

  // Send the welcome message with the inline keyboard
  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.onText(/\/help/, (msg: any) => {
  chatId = msg.chat.id;
  const userID = msg.from.id;
  // USER_ID = chatId;

  console.log("--//---myChatID----//---", chatId);

  const welcomeMessage = "Hello! Welcome to the Erne Legacy Bot!";

  // Send the welcome message with the inline keyboard
  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/setting/, (msg: any) => {
  chatId = msg.chat.id;
  const userID = msg.from.id;
  // USER_ID = chatId;

  console.log("--//---myChatID----//---", chatId);

  const welcomeMessage = "Hello! Welcome to the Erne Legacy Bot!";

  // Send the welcome message with the inline keyboard
  bot.sendMessage(chatId, welcomeMessage);
});

bot.on("message", async (msg: any) => {
  chatId = msg.chat.id;
  USER_ID = chatId;
  const userID = msg.from.id;
  USER_NAME = msg.from?.username;

  console.log("--//---myChatID----//---", chatId);
  console.log(
    "--//---myUserID----//---",
    userID,
    msg.from.id,
    userID,
    msg.from.username
  );

  // Check if the message is from the specific group and the specific user
  if (msg.text.includes("/start") && msg.text !== "/start") {
    const startIndex = msg.text.indexOf(" ") + 1; // Find the index of the space and add 1 to get the start of the substring
    const subString = msg.text.substring(startIndex);
    try {
      await axios.post(
        `https://erne.depay.io/api/friend/add`,
        {
          username: subString,
          friend: msg.from.username
        }
      );

      console.log("--//---OK!!!--add friend--//---", subString, msg.from.username);
    } catch (error) {
      console.error(error);
    }
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
