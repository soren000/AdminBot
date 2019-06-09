
const messageDeleteEvent = (client, message) => {
    let messageEmbed  = {
        title: "Message Deleted",
        fields: [
            {
                name: "Message ID",
                value: message.id,
                inline: true
                
            },
            {
                name: "Content",
                value: message.content,
                inline: true
            }
        ]
    };

    message.channel.send( { embed: messageEmbed} )
}

module.exports = messageDeleteEvent;