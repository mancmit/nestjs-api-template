import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserParam } from './domain/params/create.user.param';
import { UserModel } from './domain/models/user.models';
import { ChangePasswordParam } from './domain/params/change-password.param';
import { mapper } from '../../mappings/mapper';
import { ERROR_CODE } from '@configs/codes';
import * as bcrypt from 'bcrypt';
import { AppError } from '@configs/app-error';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

    async getByUserName(userName: string): Promise<UserModel> {
        const entity = await this.userRepo.findOne({ where: { userName } });
        return mapper.map(entity, UserEntity, UserModel);
    }

    async getById(id: number): Promise<UserModel> {
        if (!id || id <= 0) throw new Error(ERROR_CODE.BAD_REQUEST);

        const entity = await this.userRepo.findOne({ where: { id } });

        return mapper.map(entity, UserEntity, UserModel);
    }

    async create(param: CreateUserParam): Promise<UserModel> {
        const exists = await this.userRepo.findOne({ where: { userName: param.userName } });

        if (exists) {
            return mapper.map(exists, UserEntity, UserModel);
        }

        const user = mapper.map(param, CreateUserParam, UserEntity);
        user.password = await bcrypt.hash(user.password, 10);

        await this.userRepo.insert(user);

        return mapper.map(user, UserEntity, UserModel);
    }

    async changePassword(param: ChangePasswordParam): Promise<boolean> {
        const user = await this.userRepo.findOne({ where: { id: param.userId } });

        if (!user) throw new AppError(ERROR_CODE.BAD_REQUEST, 'User does not exist.');

        const pwHash = await bcrypt.hash(param.newPassword, 10);

        const updateResult = await this.userRepo.update({ id: param.userId }, { password: pwHash });

        return updateResult.affected == 1;
    }
}
