export const rabbitMQConfig = () => ({
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    queueName: process.env.RABBITMQ_QUEUE || 'my_queue',
});
