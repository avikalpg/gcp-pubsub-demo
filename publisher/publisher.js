const { PubSub } = require('@google-cloud/pubsub');

const projectId = "spatial-arcadia-138421";
const pubsub = new PubSub({ projectId });

function publishMessage(topicName, data, msgType) {
	const topic = pubsub.topic(topicName);
	const message = {
		data: Buffer.from(JSON.stringify(data)),
		attributes: { msgType }
	};
	return topic.publishMessage(message);
}

function main() {
	const topicName = "test-topic";
	const data = {
		'sender': 'Avikalp Gupta',
		'random string': 'quick brown fox'
	};
	publishMessage(topicName, data, 'test').then(result => {
		console.log(`result: ${result}`);
	}).catch(err => {
		console.error(`Error publishing message for the topic: ${topicName}`, err);
	});
}

main();
