import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { UserService } from '../../modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
        }),
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
