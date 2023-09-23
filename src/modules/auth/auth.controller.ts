import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dtos/inputs/login.input';
import { RefreshTokenInput } from './dtos/inputs/refresh-token.input';
import { ChangePasswordParam } from './domain/params/change-password.param';
import { ChangePasswordInput } from './dtos/inputs/change-password.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginModel } from './domain/models/login.model';
import { mapper } from '../../mappings/mapper';
import { LoginParam } from './domain/params/login.param';
import { RefreshTokenParam } from './domain/params/refresh-token.param';
import { LoginOutput } from './dtos/outputs/login.output';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginInput): Promise<LoginOutput> {
        const param = mapper.map(body, LoginInput, LoginParam);
        const login = await this.authService.login(param);
        return mapper.map(login, LoginModel, LoginOutput);
    }

    @ApiBearerAuth()
    @Post('refresh-token')
    async refreshToken(@Body() body: RefreshTokenInput): Promise<LoginOutput> {
        const param = mapper.map(body, RefreshTokenInput, RefreshTokenParam);
        const login = await this.authService.refreshToken(param);
        return mapper.map(login, LoginModel, LoginOutput);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(@Body() body: ChangePasswordInput, @Request() req): Promise<any> {
        const param = mapper.map(body, ChangePasswordInput, ChangePasswordParam);
        param.userId = req.user.uid;

        const isOk = await this.authService.changePassword(param);

        return { isOk };
    }
}
