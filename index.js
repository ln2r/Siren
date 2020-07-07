const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('guildMemberAdd', member => {
    member.guild.channels.get('620577932502499347').send("Welcome, We are NewHorizon."); 
const guild = member.guild;
});
client.on('message' , message => {
      if (message.content.startsWith("n!kick")) { 
	      if (message.author.bot) return;
      	 	 	const user = message.mentions.users.first();	    
        	 if (user === undefined) { 
        	 	return  message.channel.send('Usage: ```!kick <@user>```')
        	}
if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send('No permission!');
        }
        var member= message.mentions.members.first();
        if (member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send('This user is a mod!');
        	}
 member.kick();
 	message.channel.send(member.displayName + " has been successfully been kicked!");
 	 } else
 	 	if (message.content.startsWith("n!ban")) {
			if (message.author.bot) return;
const user = message.mentions.users.first();
        	 if (user === undefined) { 
        	 	return  message.channel.send('Usage: ```!ban <@user>```');
        	}
   if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send('No permission!');
        }
			
               var member= message.mentions.members.first();
        if (member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send('This user is a admin!');
        	}
 	  var member= message.mentions.members.first(); // ban
 	   member.ban();
 	   	  
 	message.delete()
 	message.channel.send(member.displayName + " has been stook with a ban hammer")
 	  } else
if (message.content.startsWith("n!status")) {
const os = require("os-utils")
const moment = require('moment');	
const ram = process.memoryUsage().heapUsed / 1024 / 1024;
const uptime = moment(process.uptime()).format('d [days], h [hours], m [minutes] [and] s [seconds]');
const embed = new Discord.MessageEmbed()
.setTitle("Status")
.addField("RAM", Math.floor(ram) + `mb of ram currently being used and ${Math.floor(os.totalmem())} Is my total memory`)
.addField("Version", "Discord.js version is 11.4.1")
.addField("Uptime", `${Math.floor(process.uptime())} Seconds up.`)
.addField("System username",`amrpowershot`)
.addField(`Running node version`, `${process.version}`)
message.channel.send(embed);
}
 	  });
client.on("message", message => {
if (message.content.startsWith("n!eval")) {  
const args = message.content.split(" ").slice(1)
  if(message.author.id !==  "571752439263526913") {
return message.channel.send('This command is private.');
    try {
function clean(text) {  if (typeof(text) === "string")
return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
      const code = args.join(" ");
      let evaled = eval(code);
       if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
       message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {     

 message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``); 
 }
  }});
const say = "Say"
client.on("message", message => {
if (message.content.startsWith("Say")) {
	if (message.author.bot) return;
if (message.author.id !== "571752439263526913" && message
.author.id !== "699546194917195806") {
return
}
const args = message.content.slice(say.length).trim().split(/ +/g);
  const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage)
} 
});
client.login('NzI5ODc5NjEwMDM2MTkxMzE1.XwPXbw.aOT-RxtV9h2C20CIjL8sQvvajVM').catch(console.error);
