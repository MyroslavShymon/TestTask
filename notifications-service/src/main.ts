import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {Logger} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://rabbitmq:5672'],
            queue: 'users_queue',
            queueOptions: {
                durable: false,
            },
        },
    });

    await app.listen();
    Logger.log('Notifications service is running...');
}

bootstrap();
