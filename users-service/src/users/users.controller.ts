import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from './services';
import {CreateUserDto} from './dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
