import { AutoMap } from '@automapper/classes';

export class LoginOutput {
    @AutoMap()
    readonly accessToken: string;

    @AutoMap()
    readonly refreshToken: string;
}
