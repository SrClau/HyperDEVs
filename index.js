const token = process.env["DISCORD_TOKEN"];
const Discord = require("discord.js");
const { MessageEmbed, Guild, Client } = require("discord.js");
const client = new Client();
const fs = require("fs");
const mega = require("megadb");

client.on("ready", () => {
 client.user.setPresence({ 
   online: "dnd",
   activity: {
     name: "Development bot",
     type: "WATCHING",
   }
 });
 
 console.log("Rich Presence created");
  
 client.commands = new Discord.Collection();
 
 const foldersCommand = fs.readdirSync("./commands");
 
 for (let folder of foldersCommand){
   const file = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
   for (let fileCommand of file){
     const command = require(`./commands/${folder}/${fileCommand}`);
     client.commands.set(command.name, command);
   }
 }
 
  console.log("DiscordBot enabled");
  
});

client.on("message", message => {
let guilds = new mega.crearDB(message.guild.id, "guilds");

const prefix = guilds.obtener("prefix") || "!";

if(message.author.bot){
return;
}

if(!message.content.startsWith(prefix)){
return;
}

const args = message.content.slice(prefix.length).trim().split(/ +/g);
const commandName = args.shift().toLowerCase();

const command = client.commands.get(commandName) || client.commands.find(cmd => (cmd.aliases && cmd.aliases.includes(commandName)));

if(command) {
 command.execute(message, args); 
} else {
message.channel.send("@");
}

console.log(command);
});

client.login(token);