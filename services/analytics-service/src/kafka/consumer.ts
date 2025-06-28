import type { KafkaMessage } from 'kafkajs';

import { topics, type Topic } from './topics.js';
import { kafkaConsumer } from '../config/kafka.js';
import * as authConsumers from './consumers/auth-consumers.js';
import * as paymentConsumers from './consumers/payment-consumers.js';
import * as orderConsumers from './consumers/order-consumers.js';
import * as productConsumers from './consumers/product-consumers.js';

export async function startAnalyticsConsumer(): Promise<void> {
    await kafkaConsumer.connect();
    
    // Subscribe to topics one by one to identify which one might be causing issues
    const topicList = Object.values(topics);
    
    await kafkaConsumer.subscribe({ topics: topicList });

    await kafkaConsumer.run({
        eachMessage: async ({ topic, partition, message }: { topic: Topic; partition: number; message: KafkaMessage }) => {
            try {
                const value = message.value?.toString() || 'null';
                switch (topic) {
                    case topics.PRODUCT_CREATED:
                        await productConsumers.handleProductCreated(message);
                        break;
                    case topics.USER_REGISTERED:
                        await authConsumers.handleUserRegistered(message);
                        break;
                    case topics.PAYMENT_SUCCESS:
                        await paymentConsumers.handlePaymentSuccess(message);
                        break;
                    case topics.ORDER_PLACED:
                        await orderConsumers.handleOrderPlaced(message);
                        break;
                    default:
                        console.warn(`Unhandled topic: ${topic}, message: ${value}`);
                }
            } catch (innerErr) {
                console.error(`Error processing message from topic ${topic} [partition ${partition}]:`, innerErr);
            }
        },
    });
}