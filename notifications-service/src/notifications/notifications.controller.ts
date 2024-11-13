import {Controller} from '@nestjs/common';
import {NotificationsService} from './notifications.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {
    }

    @MessagePattern('delayed_notification')
    async handleDelayedNotification(data: any) {
        const {userId} = data;
        await this.notificationsService.sendDelayedNotification(userId);
    }
}
