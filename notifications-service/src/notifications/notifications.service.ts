import {Injectable, Logger} from '@nestjs/common';
import {firstValueFrom} from "rxjs";
import {HttpService} from "@nestjs/axios";

export interface IMessage {
    userId: number,
    notification: string
}

@Injectable()
export class NotificationsService {
    constructor(private readonly httpService: HttpService) {
    }

    async sendDelayedNotification(userId: number): Promise<void> {
        const delay = 24 * 60 * 60 * 1000;
        const webhookUrl = 'https://webhook.site/e6bd215c-ea1f-4ef4-b940-df36cfd708f8';
        const message: IMessage = {
            userId,
            notification: 'I want to work at Obrio',
        };

        setTimeout(async () => {
            try {
                const response = await firstValueFrom(this.httpService.post(webhookUrl, message));
                Logger.log(`Sent push notification for user ${userId}`);
                Logger.log('Response from Webhook:', response);
            } catch (error) {
                console.error('Error sending notification:', error);
            }
        }, delay);
    }
}
