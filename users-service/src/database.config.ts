import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {User} from "./users/entities";

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST', 'db'),
    port: configService.get<number>('POSTGRES_PORT', 5432),
    username: configService.get<string>('POSTGRES_USER', 'user'),
    password: configService.get<string>('POSTGRES_PASSWORD', 'password'),
    database: configService.get<string>('POSTGRES_DB', 'testdb'),
    synchronize: true,
    entities: [User],
});