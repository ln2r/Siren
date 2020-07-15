
exports.run = (client, msg, args) => {
  const logger = client.logger;
  console.log(args);
  
  var temp = parseInt(args[0]) || 0;
  console.log(temp);

    if(temp < 1 || temp > 99)
      msg.reply('Please select a number from 1-99');

    else {

        console.log(temp);
      msg.channel.fetchMessages({limit: (temp+1)}).then(messages => {
          const unpinnedMessages = messages.filter(msg => !(msg.pinned)); 
          msg.channel.bulkDelete(unpinnedMessages, true);

          msgsDeleted = unpinnedMessages.array().length; 
          client.flag = true;
        msg.channel.send(msgsDeleted-1 + ' message(s) deleted!');
        logger.log(msgsDeleted-1 + ' message(s) deleted!');

      }).catch(err => {
        logger.error('Error while doing Bulk Delete', client.day);
        logger.error(err, client.day);
        msg.delete();
      });
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "purge",
    category: "Moderation",
    description: "Purge a specified number of messages from the channel.",
    usage: "purge <1-99>"
  };