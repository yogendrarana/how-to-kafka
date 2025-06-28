import { type Request, type Response } from 'express';
import { kafkaProducer } from '../config/kafka.js';
import { topics } from '../kafka/topics.js';

export const postPayment = async (req: Request, res: Response) => {
    try {
        // Extract payment details from request body
        const { amount, paymentMethod } = req.body;

        // Simulate payment processing logic
        const paymentResult = {
            amount,
            paymentMethod,
            status: 'success',
            transactionId: 'txn_1234567890',
        };

        // send payment success event to Kafka
        // this will be consumed by the analytics service
        await kafkaProducer.send({
            topic: topics.PAYMENT_SUCCESS,
            messages: [
                {
                    key: paymentResult.transactionId,
                    value: JSON.stringify(paymentResult),
                },
            ],
        });

        // Respond with success
        res.status(200).json(paymentResult);
    } catch (error) {
        res.status(500).json({ error: 'Payment processing failed' });
    }
};
