import { AppError } from 'configs/app-error';
import { ERROR_CODE } from 'configs/codes';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
        super();
        if (!jwtService) {
            console.log('JwtAuthGuard >>> jwtService: ', jwtService);
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            let token = req.headers['x-access-token'];

            if (!token) {
                const bearerToken = req.headers.authorization ? req.headers.authorization.split(' ') : [];
                if (bearerToken.length < 1) return false;

                token = bearerToken[1];
                if (!token) return false;
            }

            req.user = await this.jwtService.verifyAsync(token);
            return true;
        } catch (err) {
            throw new AppError(ERROR_CODE.UNAUTHORIZED);
        }
    }
}
