import {Module} from '@nestjs/common';
import {NotificationManagerService, UsersService} from './services';
import {UsersController} from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ClientsModule.register([
            {
                name: 'NOTIFICATIONS_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://rabbitmq:5672'],
                    queue: 'users_queue',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService, NotificationManagerService],
})
export class UsersModule {
}
