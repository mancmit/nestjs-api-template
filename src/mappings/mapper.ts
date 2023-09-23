import { createMapper, createMap } from '@automapper/core';
import { classes } from '@automapper/classes';
import { CreateUserInput } from '@modules/user/dto/inputs/create-user.input';
import { CreateUserParam } from '@modules/user/domain/params/create.user.param';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserModel } from '@modules/user/domain/models/user.models';
import { UserOutput } from '@modules/user/dto/outputs/user.output';
import { LoginInput } from '@modules/auth/dtos/inputs/login.input';
import { LoginParam } from '@modules/auth/domain/params/login.param';
import { RefreshTokenInput } from '@modules/auth/dtos/inputs/refresh-token.input';
import { RefreshTokenParam } from '@modules/auth/domain/params/refresh-token.param';
import { LoginModel } from '@modules/auth/domain/models/login.model';
import { LoginOutput } from '@modules/auth/dtos/outputs/login.output';
import { ChangePasswordInput } from '@modules/auth/dtos/inputs/change-password.input';
import { ChangePasswordParam } from '@modules/auth/domain/params/change-password.param';

export const mapper = createMapper({
    strategyInitializer: classes(),
});

export function createMappingProfile() {
    createMap(mapper, CreateUserInput, CreateUserParam);
    createMap(mapper, CreateUserParam, UserEntity);
    createMap(mapper, UserEntity, UserModel);
    createMap(mapper, UserModel, UserOutput);
    createMap(mapper, LoginInput, LoginParam);
    createMap(mapper, RefreshTokenInput, RefreshTokenParam);
    createMap(mapper, LoginModel, LoginOutput);
    createMap(mapper, ChangePasswordInput, ChangePasswordParam);
}
