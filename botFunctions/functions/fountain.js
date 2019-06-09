const Discord = require('discord.js')

let client;

module.exports = async (newClient, message) => {
    client = newClient;
    const server = message.guild;

    // const test1 = "357490324643512321";

    // const testUser = client.fetchUser(test1);
    const userToSendTo = message.mentions.members.first();
    // const userToSendTo = await testUser;

    const usersRestrictedRolePromise = message.guild.createRole({
        name: userToSendTo.username + userToSendTo.discriminator
    });

    const usersRestrictedRole = await usersRestrictedRolePromise;


    for (let i = 0; ; i++) {
        // const test5 = server.channels.find(c => c.name == 'radiant-fountain' || 'dire-fountain' || `fountain${i}`); 
        const test5 = server.channels.find(c => c.name == `fountain${i}`); 
        // console.log(test5);

        if (test5 === null) { 
        //     let spice;
        //     if (i === 0) {
        //         spice = 'radiant-fountain';
        //     }
        //     else if (i === 1) {
        //         spice = 'dire-fountain';
            // }

            // server.createChannel(spice ? spice : `fountain${i}`, "text")
            server.createChannel(`fountain${i}`, "text", [
                {
                    id: message.guild.defaultRole.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: usersRestrictedRole.id,
                    allow: ['VIEW_CHANNEL']
                }
            ])
                .then(channel => {
                    channel.setParent('484665943038099470');
                    // channel.overwritePermissions(usersRestrictedRole, { VIEW_CHANNEL: true });
                })
                .catch((err) => {
                    console.log(err);
                })

            break;
        }
    }

    message.guild.channels.forEach((x) => {
        if ((x.type === 'category') && (x.name !== 'fountain')) {
            x.overwritePermissions(usersRestrictedRole, {
                VIEW_CHANNEL: false
              });
        }
    });

    userToSendTo.addRole(usersRestrictedRole);

    let embed = new Discord.RichEmbed()
        .setColor('#000000')
        .addField(`__Action Required__`, "You have been fountained in the Artifact Discord.\nWhile fountained, you cannot talk in other channels.\nPlease talk to the mods in the Fountain channel to get the tag removed.\n\nIf you do not respond in 24 hours, you will be banned from the server.")

    return userToSendTo.send(embed);
}