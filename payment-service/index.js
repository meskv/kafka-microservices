import express from "express";
import cors from "cors";
import { Kafka } from "kafkajs";

const app = express();
const PORT = process.env.PORT || 8000;

// So only allow requests from the frontend
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//   })
// );

// Allow all origins for development purposes
app.use(cors());

app.use(express.json());

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();

const connectToKafka = async () => {
  try {
    // Connect the producer to the Kafka cluster
    await producer.connect();
    console.log("Producer Connected successfully");
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
    process.exit(1);
  }

  // You can add more Kafka operations here if needed
};

// error handler
app.use((err, req, res, next) => {
  console.status(err.status || 500).send({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.get("/", (req, res) => {
  res.send("Payment Service is running");
});

app.post("/payment-service", async (req, res) => {
  // get cart details from the request body
  const { cart } = req.body;

  // WE ARE ASSUMING THE AUTHENTICATION IS DONE (get the user cookie and decrypt the user id)
  // generate random user id
  const userId = Math.floor(Math.random() * 100000000).toString();
  console.log("User ID:", userId);

  // TODO: Process the payment with the cart details
  console.log("API called to process payment for user:", userId);

  // KAFKA
  try {
    // Send a message to the payment-successful topic
    await producer.send({
      topic: "payment-successful",
      messages: [
        {
          key: userId,
          value: JSON.stringify({ userId, cart }),
        },
      ],
    });
    console.log("Payment processed successfully for user:", userId);
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
    return res.status(500).send({
      error: "Failed to process payment",
    });
  }

  return res.status(200).send({
    message: "Payment processed successfully",
    // userId,
    // cart,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    // Connect to Kafka when the server starts
    connectToKafka().catch((error) => {
      console.error("Error connecting to Kafka:", error);
      process.exit(1);
    });
    console.log(`Payment Service is running on port ${PORT}`);
  }
});
