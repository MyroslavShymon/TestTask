import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';

@Injectable()
export class NotificationManagerService {
    constructor(@Inject('NOTIFICATIONS_SERVICE') private client: ClientProxy) {
    }

    sendDelayedNotification(userId: number) {
        const delay = 24 * 60 * 60 * 1000;
        const message = {
            userId,
            sendAt: new Date(Date.now() + delay),
        };

        this.client.emit('delayed_notification', message);
    }
}
