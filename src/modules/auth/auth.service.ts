import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppError } from '@configs/app-error';
import { ERROR_CODE } from '@configs/codes';
import { LoginModel } from './domain/models/login.model';
import { UserService } from '@modules/user/user.service';
import { LoginParam } from './domain/params/login.param';
import { RefreshTokenParam } from './domain/params/refresh-token.param';
import { ChangePasswordParam } from './domain/params/change-password.param';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

    async login(param: LoginParam): Promise<LoginModel> {
        const user = await this.userService.getByUserName(param.username);
        if (!user) throw new AppError(ERROR_CODE.BAD_REQUEST, 'User does not exist.');

        const isMatch = await bcrypt.compare(param.password, user.password);
        if (!isMatch) throw new AppError(ERROR_CODE.UNAUTHORIZED);

        return this.getToken(user.id);
    }

    async refreshToken(param: RefreshTokenParam): Promise<LoginModel> {
        try {
            const data = this.jwtService.verify(param.refreshToken);
            return this.getToken(data.uid);
        } catch (err) {
            throw new AppError(ERROR_CODE.UNAUTHORIZED);
        }
    }

    async changePassword(param: ChangePasswordParam): Promise<boolean> {
        const user = await this.userService.getById(param.userId);

        const isMatch = await bcrypt.compare(param.oldPassword, user.password);
        if (!isMatch) throw new AppError(ERROR_CODE.BAD_REQUEST, 'Old password incorrect.');

        return await this.userService.changePassword({ userId: param.userId, newPassword: param.newPassword });
    }

    private getToken(userId: number): LoginModel {
        const payload = { uid: userId };

        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE_IN),
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRE_IN),
            }),
        };
    }
}
