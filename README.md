NodeJS example for Google Cloud Platform's Pub/Sub
===

This demo was created for my talk on ["Building Scalable Cloud Applications with Pub/Sub Messaging](https://docs.google.com/presentation/d/1w628j5ozticsmPVWU4nGXzLa7xNWwTDx/edit?usp=sharing&ouid=109519938620653154140&rtpof=true&sd=true) during the [GDG Cloud Conversations Event](https://gdg.community.dev/events/details/google-gdg-cloud-bengaluru-presents-cloud-conversations-2024-unleashing-the-power-of-innovation/) in Bengaluru (India) on 10th February 2024.

## Setup
1. Install the dependencies (there is only one: `@google-cloud/pubsub`)
```
npm install
```
2. This project assumes that you have `gcloud` CLI set up in your terminal with the correct credentials.

## How to use
In order to use this script, you will first have to create a topic and one or two subscriptions. Here are the steps:

### Pub/Sub setup
1. Visit the ["Pub/Sub" page](https://console.cloud.google.com/cloudpubsub/topic/list) in GCP.
2. Click on "Create Topic" and enter the topic name "test-topic". Leave all other options as default and click "Create".
3. This will create a topic named "test-topic" and a subscription named "test-topic-sub". 

### One publisher and one subscriber
At this point, you can run your first demo.

1. Open a terminal window and run `npm run sub`. This will launch the subscriber script which pulls from the "test-topic-sub" subscription.
2. Open another terminal window and run `npm run pub`. This will publish a message on the "test-topic" topic.

Result: you should be able to see the message in your subscriber terminal window.

### One publisher and multiple subscribers
Next, we will demo the use of multiple subscribers on the same subscription. 
1. Open another terminal and run `npm run sub` in it.
2. On the publisher terminal window, run `npm run pub` again.

Result: You will only see the message on one of the two open subscriber terminal windows.

Reason: This is because when one "worker" on the "test-topic-sub" subscription ACKs the message, it is deleted from Pub/Sub so that multiple workers do not perform duplicate processing on the same message.

### One publisher and multiple subscribers on different subscriptions
Now, we will demo the use of multiple subscribers on different subscriptions.
1. In your Google Cloud Console, on the [topic page](https://console.cloud.google.com/cloudpubsub/topic/detail/test-topic), click on the "Create subscription" button.
2. Add "diffSub" to the Subscription ID field. Create everything else as default and click on the "Create" button.
3. This will create a new subscription named "diffSub"
4. Open another terminal window and run `npm run sub2`. A third subscriber will start in this window. 
5. Go back to the publisher terminal window and run `npm run pub` again.

Result: You will the message on the first and the last subscriber terminal windows, i.e. on one worker for each subscription.

Reason: When you have multiple subscriptions on the same topic, the message will have to be ACKed from all the subscriptions before it is deleted. This ensures that different workers can be act on messages on the same topic without duplications in the same subscription.
