import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseConfig} from "./database.config";
import {UsersModule} from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `../.env.${process.env.NODE_ENV || 'development'}`,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => databaseConfig(configService),
            inject: [ConfigService],
        }),
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
