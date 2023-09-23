import { AutoMap } from '@automapper/classes';

export class UserModel {
    @AutoMap()
    id: number;

    @AutoMap()
    firstName: string;

    @AutoMap()
    lastName: string;

    @AutoMap()
    userName: string;

    @AutoMap()
    email: string;

    @AutoMap()
    password: string;
}
