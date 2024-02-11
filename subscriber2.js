const { PubSub } = require('@google-cloud/pubsub');

// Replace with your actual project ID and subscription name
const projectId = 'spatial-arcadia-138421';

const pubsub = new PubSub({ projectId });

async function subscribeToTopic(subscriptionName) {
	const subscription = pubsub.subscription(subscriptionName);

	// Register an error handler
	subscription.on('error', (err) => {
		console.error('Error with subscription:', err);
	});

	// Register a message handler
	subscription.on('message', (message) => {
		console.log(`Received message: ${message.data.toString()}`);
		message.ack(); // Acknowledge the message (mark as processed)
	});

	// Start pulling messages
	await subscription.open();

	// Pull messages every second
	setInterval(() => {
		subscription.get({ maxMessages: 1 }, (err, messages) => {
			if (err) {
				console.error('Error pulling messages:', err);
				return;
			}
			if (messages.length > 0) {
				console.log(`Pulled message: ${messages[0].data.toString()}`);
				messages[0].ack(); // Acknowledge the pulled message
			}
		});
	}, 1000);
}

function main() {
	const subscriptionName = 'diffSub';
	subscribeToTopic(subscriptionName).catch((err) => {
		console.error('Error subscribing to topic:', err);
	});
}

main();
