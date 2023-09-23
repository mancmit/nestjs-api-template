import { AutoMap } from '@automapper/classes';

export class LoginModel {
    @AutoMap()
    accessToken: string;

    @AutoMap()
    refreshToken: string;
}
