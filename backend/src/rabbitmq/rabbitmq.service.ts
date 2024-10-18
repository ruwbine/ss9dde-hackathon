import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
    constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

    // Отправка запроса в очередь с шаблоном (pattern) и данными
    async sendRequestToQueue(pattern: string, data: any) {
        try {
            return await this.client.send(pattern, data).toPromise(); // Запрос с ожиданием ответа
        } catch (error) {
            console.error('Error sending message to RabbitMQ:', error);
        }
    }

    // Для отправки сообщения, которое не требует ответа
    async emitEvent(pattern: string, data: any) {
        try {
            this.client.emit(pattern, data); // Отправка сообщения, не дожидаясь ответа
        } catch (error) {
            console.error('Error emitting event to RabbitMQ:', error);
        }
    }
}
