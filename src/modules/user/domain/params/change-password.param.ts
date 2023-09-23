import { AutoMap } from '@automapper/classes';

export class ChangePasswordParam {
    @AutoMap()
    readonly userId: number;

    @AutoMap()
    readonly newPassword: string;
}
