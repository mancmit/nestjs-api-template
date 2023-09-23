import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { CreateUserParam } from './domain/params/create.user.param';
import { UserModel } from './domain/models/user.models';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { mapper } from '../../mappings/mapper';
import { UserService } from './user.service';
import { UserOutput } from './dto/outputs/user.output';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(@Body() body: CreateUserInput): Promise<UserOutput> {
        const param = mapper.map(body, CreateUserInput, CreateUserParam);
        const model = await this.userService.create(param);
        return mapper.map(model, UserModel, UserOutput);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getProfile(@Request() req): Promise<UserOutput> {
        const model = await this.userService.getById(req.user.uid);
        return mapper.map(model, UserModel, UserOutput);
    }
}
