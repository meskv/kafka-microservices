import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "kafka-service",
  brokers: ["localhost:9094"],
});

// Create an admin client
// This allows you to manage topics, consumer groups, etc.
const admin = kafka.admin();

// Function to run the admin operations
// This function connects to the Kafka cluster, lists topics, creates a new topic, and then
// disconnects the admin client.
// It is an asynchronous function that uses async/await for better readability.
const run = async () => {
  // Connect the admin client
  await admin.connect();

  // List all topics
  const topics = await admin.listTopics();
  console.log("Topics:", topics);

  // Create a new topic
  await admin.createTopics({
    topics: [
      { topic: "payment-successful", numPartitions: 1 },
      { topic: "order-successful", numPartitions: 1 },
      { topic: "email-successful", numPartitions: 1 },
    ],
  });
  console.log("Topics created successfully");

  // List topics again to confirm creation
  const updatedTopics = await admin.listTopics();
  console.log("Updated Topics:", updatedTopics);

  // Disconnect the admin client
  await admin.disconnect();
};

// Execute the run function
run().catch((error) => {
  console.error("Error in admin operations:", error);
  process.exit(1);
});
