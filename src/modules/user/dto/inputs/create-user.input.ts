import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty({
        example: '',
        required: true,
        description: 'First name',
    })
    @AutoMap()
    readonly firstName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty({
        example: '',
        required: true,
        description: 'Last name',
    })
    @AutoMap()
    readonly lastName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty({
        example: '',
        required: true,
        description: 'User name',
    })
    @AutoMap()
    readonly userName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty({
        example: '',
        required: true,
        description: 'Password',
    })
    @AutoMap()
    readonly password: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty({
        example: '',
        required: true,
        description: 'Email',
    })
    @AutoMap()
    readonly email: string;
}
