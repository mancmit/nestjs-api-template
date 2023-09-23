import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class ChangePasswordInput {
    @ApiProperty({
        example: '',
        required: true,
        description: 'Old password',
    })
    @IsNotEmpty()
    @AutoMap()
    oldPassword: string;

    @ApiProperty({
        example: '',
        required: true,
        description: 'New password',
    })
    @IsNotEmpty()
    @AutoMap()
    newPassword: string;
}
