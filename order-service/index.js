import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "order-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();

const consumer = kafka.consumer({
  groupId: "order-service-group",
});

const run = async () => {
  try {
    // Connect the producer to the Kafka cluster
    await producer.connect();
    console.log("Producer Connected successfully");

    // Connect the consumer to the Kafka cluster
    await consumer.connect();
    console.log("Consumer Connected successfully");

    // Subscribe to the payment-successful topic
    await consumer.subscribe({
      topic: "payment-successful",
      fromBeginning: true,
    });

    // Consume messages from the topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        // console.log(`Received message: ${value} from topic: ${topic}`);

        const { userId, cart } = JSON.parse(value);

        // TODO: Create and order on DB
        const dummyOrderId = "3134527663";
        console.log(
          `Order Consumer: Creating order for user: ${userId} with cart:`
        );

        // we will consume this in email service
        await producer.send({
          topic: "order-successful",
          messages: [
            {
              key: userId,
              value: JSON.stringify({ userId, orderId: dummyOrderId }),
            },
          ],
        });

        console.log(
          `Order Consumer: Order created for user: ${userId} with cart:`,
          cart
        );
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
