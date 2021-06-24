const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  
  execute(message, args){
    message.channel.send("puto");
  }
};