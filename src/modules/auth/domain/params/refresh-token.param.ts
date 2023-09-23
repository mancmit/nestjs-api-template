import { AutoMap } from '@automapper/classes';

export class RefreshTokenParam {
    @AutoMap()
    readonly refreshToken: string;
}
