import { Module } from '@nestjs/common';
import {RabbitMQService} from './rabbitmq.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'app_server_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [RabbitMQService]
})
export class RabbitmqModule {}
