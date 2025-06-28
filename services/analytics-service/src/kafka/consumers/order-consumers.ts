import type { KafkaMessage } from 'kafkajs';

export async function handleOrderPlaced(message: KafkaMessage): Promise<void> {
  const order = JSON.parse(message.value!.toString());
  console.log('[LOG][ORDER_PLACED]', order);
}