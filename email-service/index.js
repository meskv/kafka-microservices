import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "email-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();

const consumer = kafka.consumer({
  groupId: "email-service-group",
});

const run = async () => {
  try {
    // Connect the producer to the Kafka cluster
    await producer.connect();
    console.log("Producer Connected successfully");

    // Connect the consumer to the Kafka cluster
    await consumer.connect();
    console.log("Consumer Connected successfully");

    // Subscribe to the order-successful topic
    await consumer.subscribe({
      topic: "order-successful",
      fromBeginning: true,
    });

    // Consume messages from the topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        // console.log(`Received message: ${value} from topic: ${topic}`);

        const { userId, orderId } = JSON.parse(value);

        // TODO: Send email notification to the user
        const dummyEmailId = "27567852";
        console.log(
          `Email Consumer: Sending email for order: ${orderId} to user: ${userId}`
        );
        await producer.send({
          topic: "email-successful",
          messages: [
            {
              key: userId,
              value: JSON.stringify({ userId, emailId: dummyEmailId }),
            },
          ],
        });
      },
    });
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
    process.exit(1);
  }
};

// Execute the run function
run().catch((error) => {
  console.error("Error in consumer operations:", error);
  process.exit(1);
});
