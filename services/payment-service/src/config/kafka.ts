import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "payment-service",
    brokers: ["localhost:9094"],
});

export const kafkaProducer = kafkaClient.producer({
    retry: {
        retries: 3,
        initialRetryTime: 300,
    }
});

export const kafkaConsumer = kafkaClient.consumer({
    groupId: "payment-service-group",
    retry: {
        retries: 3,
        initialRetryTime: 300
    }
});
