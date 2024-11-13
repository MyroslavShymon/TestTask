import {Module} from '@nestjs/common';
import {NotificationsModule} from './notifications/notifications.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `../.env.${process.env.NODE_ENV || 'development'}`,
        }),
        NotificationsModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
