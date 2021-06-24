const token = process.env["DISCORD_TOKEN"];
const Discord = require("discord.js");
const { MessageEmbed, Guild, Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
 client.user.setActivity("discord.js", { type: "WATCHING" });
 client.user.setStatus("online");
 
 console.log("Rich Presence created");
 
  
});

client.on("message", message => {
const prefix = "!";

if(message.author.bot){
return;
}
});

client.login(token);