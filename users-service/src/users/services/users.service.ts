import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto";
import {NotificationManagerService} from "./notification-manager.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private notificationManager: NotificationManagerService,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const user = this.usersRepository.create(createUserDto);
        await this.usersRepository.save(user);
        Logger.log(`User with id ${user.id} created!`);

        this.notificationManager.sendDelayedNotification(user.id);

        return user;
    }
}
