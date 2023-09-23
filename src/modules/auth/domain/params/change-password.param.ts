import { AutoMap } from '@automapper/classes';

export class ChangePasswordParam {
    @AutoMap()
    userId: number;

    @AutoMap()
    readonly oldPassword: string;

    @AutoMap()
    readonly newPassword: string;
}
