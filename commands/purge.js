const Discord = require('discord.js')
exports.run = (client, message, args => {
    const modRole = message.guild.roles.find(role => role.name === "Mod");
    if (!modRole)
    return console.log("The Mod role does not exist");

  if (!message.member.roles.has(modRole.id))
    return message.reply("You can't use this command.");

  if (message.mentions.members.size === 0)
    return message.reply("Please specify a number of messages to purge");

  if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
    retconsole.log("purging messages")
    const amount = parseInt(args[0]) + 1;
    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.');
    } else if (amount <= 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
    }
    message.channel.bulkDelete(amount, true).then(deletedMessages => {
        var botMessages = deletedMessages.filter(m => m.author.bot);
        var userPins = deletedMessages.filter(m => m.pinned);
        var userMessages = deletedMessages.filter(m => !m.author.bot);
        const embed = new Discord.RichEmbed()
            .setTitle("Success")
            .setColor(0x00AE86)
            .setFooter("NHDevBot", "https://imgur.com/BxVycFT.gif")
            .setThumbnail("https://imgur.com/BxVycFT.gif")
            .setTimestamp()
            .addField("Bot Messages Purged", botMessages.size, false)
            .addField("User Pins Purged", userPins.size, false)
            .addField("User Messages Purged", userMessages.size, false)
            .addField("Total Messages Purged", deletedMessages.size, false);
        message.channel.send(embed);
    }).catch(err => {
        console.error(err);
        message.channel.send('there was an error trying to prune messages in this channel!');
    });
});