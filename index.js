const Discord = require("discord.js");
const tokenfile = require("./config.json");
const bot = new Discord.Client();

bot.login(tokenfile.token);

let greeting = require("./message");
let weather = require("./weather");
let test = require("./test");