import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class RefreshTokenInput {
    @ApiProperty({
        required: true,
        description: 'Refresh token',
    })
    @IsNotEmpty()
    @AutoMap()
    refreshToken: string;
}
