import { AutoMap } from '@automapper/classes';

export class LoginParam {
    @AutoMap()
    readonly username: string;

    @AutoMap()
    readonly password: string;
}
