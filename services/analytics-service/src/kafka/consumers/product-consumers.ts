import type { KafkaMessage } from "kafkajs";

export async function handleProductCreated(message: KafkaMessage): Promise<void> {
  const product = JSON.parse(message.value!.toString());
  console.log('[LOG][PRODUCT_CREATED]', product);
}
