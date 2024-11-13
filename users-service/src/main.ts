import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {Logger, ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe());

    const usersServicePort = configService.get<number>('USERS_SERVICE_PORT', 3001);
    const rabbitMqPort = configService.get<number>('RABBITMQ_PORT', 5672);
    await app.listen(usersServicePort, () => {
        Logger.log(`Users service is running on http://localhost:${usersServicePort}`);
    });

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://rabbitmq:${rabbitMqPort}`],
            queue: 'users_queue',
            queueOptions: {
                durable: false,
            },
        },
    });

    await app.startAllMicroservices();

}

bootstrap();
