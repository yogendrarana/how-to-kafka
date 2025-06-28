import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
    clientId: "analytics-service",
    brokers: ["localhost:9094"],
    connectionTimeout: 3000,
    requestTimeout: 30000,
    retry: {
        initialRetryTime: 100,
        retries: 3
    }
});

export const kafkaProducer = kafkaClient.producer({
    retry: {
        retries: 3,
        initialRetryTime: 300,
    }
});

export const kafkaConsumer = kafkaClient.consumer({
    groupId: "analytics-service-group",
    retry: {
        retries: 3,
        initialRetryTime: 300
    },
    sessionTimeout: 10000,
    heartbeatInterval: 1000,
    rebalanceTimeout: 60000,
    maxWaitTimeInMs: 5000,
    metadataMaxAge: 300000,
    allowAutoTopicCreation: true
});

