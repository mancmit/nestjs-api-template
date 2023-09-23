import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class LoginInput {
    @ApiProperty({
        example: '',
        required: true,
        description: 'User name',
    })
    @IsNotEmpty()
    @AutoMap()
    username: string;

    @ApiProperty({
        example: '',
        required: true,
        description: 'Password',
    })
    @IsNotEmpty()
    @AutoMap()
    password: string;
}
