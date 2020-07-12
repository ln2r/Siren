exports.run = async (client, message, [mention]) => {
    if (!message.mentions.users.size) {
        return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
    }

    const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
    });

    message.channel.send(avatarList);
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pfp"],
    permLevel: "Bot Admin"
};

module.exports = {
    name: avatar,
    category: Utility,
    description: "Gets the avatar of the mentioned user",
    usage: "avatar <@user>"
};