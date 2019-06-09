const Discord = require("discord.js");
// const readablePerms = require("../../jsonfiles/readablePerms")
// const cleanDate = require("./cleanDate.js");

module.exports = (client, message) => {
    if (message.channel.type === "dm") {
        let embed = new Discord.RichEmbed()
            .addField(`Error`, `The bot does not serve this command in private message. Type the command in a server for it to work.`)
        return message.channel.send(embed);
    }


    let tempID = 357490324643512321;
    let tempName = 'Oxiarr';
    let searchType = {
        type: false,
        memberID: null
    };
    let foundUserCount = 0;

    message.guild.members.forEach((member) => {
        if (member.id === tempID) {
            searchType.type = 'userID';
            searchType.memberID = member;
            foundUserCount++;
        }
        else if (member.user.username.toLowerCase() === tempName.toLowerCase()) {
            searchType.type = 'userHandle';
            searchType.memberID = member;
            foundUserCount++;
        }
        else if (`${member.user.username.toLowerCase()}#${member.user.discriminator.toLowerCase()}` === tempName.toLowerCase()) {
            searchType.type = 'fullAccountName';
            searchType.memberID = member;
            foundUserCount++;
        }
        else if (`${member.user.username.toLowerCase()}${member.user.discriminator.toLowerCase()}` === tempName.toLowerCase()) {
            searchType.type = 'simpleAccountName';
            searchType.memberID = member;
            foundUserCount++;
        }
        else if (`${member.displayName.toLowerCase()}` === tempName.toLowerCase()) {
            searchType.type = 'nickname';
            searchType.memberID = member;
            foundUserCount++;
        }
        //let user = message.mentions.users.first()
    });

    if (searchType.type === false) {
        let embed = new Discord.RichEmbed()
            .addField(`Error: User not found`, `Unable to find a user based on your input. Check your message.\nQuery results must contain a user ID, user handle, user tag, or message ID.\n__Examples:__\`\`\`?finduser 357490324643512321\n?finduser [357490324643512321]\n?finduser [Ox]\`\`\``)
        return message.channel.send(embed);
    };
    if (foundUserCount > 1) {
        let embed = new Discord.RichEmbed()
            .addField(`Error: Multiple Users Found`, `Found multiple users with the query you inputed. Enter a user ID or a message ID which will be unique and return only 1 result.\n__Examples:__\`\`\`?finduser 357490324643512321\n?finduser [357490324643512321]\`\`\`\`\`\`Not:\n?finduser [Ox]\n?finduser Ox\`\`\``)
        return message.channel.send(embed);
    };

    let foundUser = searchType.memberID;

    let userRoles = '';
    for (let i = 0; i < foundUser._roles.length; i++) {
        userRoles += message.guild.roles.get(foundUser._roles[i]);
    }

    let userPermissionsUnr = message.channel.permissionsFor(message.member).toArray(); //An object of all the permissions the user has
    let userPermissionsRe = [];
    for (let i = 0; i < userPermissionsUnr.length; i++) {
        userPermissionsRe.push(readablePerms[userPermissionsUnr[i]]);
    }
    let permsString = userPermissionsRe.join(', ');

    let joinedTime = cleanDate(foundUser.joinedAt);
    let createdAccnt = cleanDate(foundUser.user.createdAt);
    let pingString = `<@${foundUser.id}>`;
    let avatarImage = foundUser.user.displayAvatarURL;
    let userName = foundUser.user.username + '#' + foundUser.user.discriminator;
    let userID = foundUser.user.id;

    let findPosition = async () => {
        let res = await foundUser.guild.fetchMembers();

        let output = res.members.sort((a, b) => {
            return new Date(a.joinedTimestamp) - new Date(b.joinedTimestamp);
        }).keyArray();

        let position = output.indexOf(foundUser.id)+1;

        return position;
    }

        (async () => {
            let embed = new Discord.RichEmbed()
                .setAuthor(userName, avatarImage)
                .setColor('#000000')
                .setDescription(pingString)
                .addField(`**ID**`, userID, true)
                .addField(`**Created**`, `${createdAccnt}`, true)
                .addField(`**Join Position**`, await findPosition(), true)
                .addField(`**Joined**`, `${joinedTime}`, true)
                .addField(`**Roles**`, `${userRoles}`)
                .addField(`**Permissions**`, `\n${permsString}`)
                .setThumbnail(avatarImage);

            return message.channel.send(embed);
        })()

    // client.channels.forEach((channel) => {
    //     console.log(channel.id);
    // });
    // let filteredString = message.content.match(cardRegex);
    // let IDArray = filteredString[1].split(', ');

    // let channel = message.guild.channels.get(IDArray[0]);

    // channel.fetchMessage(IDArray[1])
    //     .then(foundMessage => {
    //         let mEmbed = new Discord.RichEmbed()
    //             .addField('__User Lookup__', `**Found Message**: ${foundMessage.content}\n**Found Channel:** ${foundMessage.channel}\n**Author Name**: ${foundMessage.author}\n**Author ID**: ${foundMessage.author.id}\n**Message Sent**: ${foundMessage.createdAt.toLocaleString().replace(/-/g, '/')}`, true)
    //         message.channel.send(mEmbed)
    //     })
    //     .catch(console.error);
    return;
};

let joinPosition = (x) => {

}