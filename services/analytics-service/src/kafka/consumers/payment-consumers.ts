import type { KafkaMessage } from 'kafkajs';

export async function handlePaymentSuccess(message: KafkaMessage): Promise<void> {
  const payment = JSON.parse(message.value!.toString());
  console.log('[LOG][PAYMENT_SUCCESS]', payment);
}