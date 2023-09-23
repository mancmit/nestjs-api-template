import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceOption } from '@configs/data-source';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forRoot(AppDataSourceOption), UserModule, AuthModule],
    controllers: [AppController],
    providers: [AppService, UserModule, AuthModule],
})
export class AppModule {}
