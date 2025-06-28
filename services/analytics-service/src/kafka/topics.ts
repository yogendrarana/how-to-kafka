export const topics = {
  PRODUCT_CREATED: 'product.created',
  USER_REGISTERED: 'user.registered',
  PAYMENT_SUCCESS: 'payment.success',
  ORDER_PLACED: 'order.placed',
};

export type Topic = typeof topics[keyof typeof topics];
