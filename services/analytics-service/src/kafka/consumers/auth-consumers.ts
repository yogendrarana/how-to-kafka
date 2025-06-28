import type { KafkaMessage } from 'kafkajs';

export async function handleUserRegistered(message: KafkaMessage): Promise<void> {
  const user = JSON.parse(message.value!.toString());
  console.log('[LOG][USER_REGISTERED]', user);
}