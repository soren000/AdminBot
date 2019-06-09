const { client } = require('./discord/discord');
const { firebase, database } = require('./firebase/firebase');
const { 
	findUser, 
	fountain,
	messageDeleteEvent
} = require('./botFunctions/commandIndex');


client.on('ready', () => {
	console.log('Ready!');
	client.user.setActivity('1');
	testFunction();
});

client.on('messageDelete', message => messageDeleteEvent(client, message));

client.on('message', async message => {
	try {
		if ((message.author.bot) && ((message.content.toLowerCase().includes('?fountain')) === false)) {
			return;
		}
		// if (message.content.toLowerCase().includes('?finduser')) {
		// 	findUser(client, message);
		// 	return;
		// }
		// if (message.content.toLowerCase().includes('?fountain')) {
		// 	await fountain(client, message);
		// 	return;
		// }
		
	}
	catch(e) {
		console.log('error', e)
	}
});

let testFunction = () => {
	let command = '?fountain';
	let testChannelID = '547155685452939274';

	let channel = client.channels.get(testChannelID);
	return channel.send(command);
};

client.on('error', console.error);

client.login(token);



// let logsChannel = '547155685452939274';