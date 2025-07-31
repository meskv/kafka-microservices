import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "analytic-service",
  brokers: ["localhost:9094"],
});

const consumer = kafka.consumer({
  groupId: "analytic-service-group",
});

const run = async () => {
  try {
    // Connect the consumer to the Kafka cluster
    await consumer.connect();
    console.log("Consumer Connected successfully");

    // Subscribe to the topics
    await consumer.subscribe({
      topics: ["payment-successful", "order-successful", "email-successful"],
      fromBeginning: true,
    });

    // Consume messages from the topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Process each message
        console.log(`Received message from topic: ${topic}`);

        // switch case
        switch (topic) {
          case "payment-successful":
            {
              // Handle payment successful message
              const value = message.value.toString();
              const { userId, cart } = JSON.parse(value);

              // Calculate total amount from cart
              const total = cart
                .reduce((sum, item) => sum + item.price, 0)
                .toFixed(2);

              console.log(
                `Analytic Consumer: Payment Received for user: ${userId} - total: `,
                total
              );
            }
            break;
          case "order-successful":
            {
              // Handle order successful message
              const value = message.value.toString();
              const { userId, orderId } = JSON.parse(value);

              console.log(
                `Analytic Consumer: OrderId : ${orderId} created for userId: ${userId}`
              );
            }

            break;
          case "email-successful":
            {
              // Handle email successful message
              const value = message.value.toString();
              const { userId, emailId } = JSON.parse(value);

              console.log(
                `Analytic Consumer: Email id ${emailId} sent to userId: ${userId}`
              );
            }
            break;
          default:
            console.warn(`Unhandled topic: ${topic}`);
        }

        // Here you can add logic to process the payment data, e.g., store it in
        // a database or perform analytics
        // Here you can process the message as needed
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
