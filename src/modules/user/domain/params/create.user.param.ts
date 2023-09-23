import { AutoMap } from '@automapper/classes';

export class CreateUserParam {
    @AutoMap()
    readonly firstName: string;

    @AutoMap()
    readonly lastName: string;

    @AutoMap()
    readonly userName: string;

    @AutoMap()
    readonly password: string;

    @AutoMap()
    readonly email: string;
}
