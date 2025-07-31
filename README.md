# Kafka Microservices Demo

This project demonstrates how Apache **Kafka** can be used for **real-time communication** between loosely coupled microservices using Node.js and KafkaJS. The focus here is to simulate messaging with Kafka where microservices publish and consume events using different Kafka topics. This setup is ideal for testing and learning Kafka integration with microservices architecture.

## Microservices Included

This project includes the following services:

- `ecommerce` – Client frontend application
- `kafka-server` – Kafka broker running via Docker
- `payment-service` – Produces payment-related events to Kafka
- `order-service` – Produces order-related events to Kafka
- `email-service` – Consumes events and simulates email notifications
- `analytic-service` – (Optional) Consumes events for analytics

**Note:** These services are minimal and meant for testing Kafka-based communication, not production-ready implementations.

## Communication Overview

Kafka enables real-time, asynchronous communication between services using topics. Each producer service publishes messages to a specific topic, and the consumer services listen and process messages from those topics. This event-driven architecture is highly scalable and decouples microservices effectively.

## Kafka Configuration (Docker)

Kafka is set up using Bitnami's Kafka Docker image in KRaft (Kafka Raft) mode, which eliminates the need for ZooKeeper. Kafka is exposed on port `9094`. Kafka UI is also included to monitor topics and messages visually.

### See `docker-compose.yml` file 

## Setting Up the Micro-Services
