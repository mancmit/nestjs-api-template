import { Column, Entity, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    @AutoMap()
    id: number;

    @Index('idx_user_username', { unique: true })
    @Column({
        name: 'user_name',
        type: 'varchar',
        nullable: false,
    })
    @AutoMap()
    userName: string;

    @Column({
        name: 'password',
        type: 'varchar',
        nullable: false,
    })
    @AutoMap()
    password: string;

    @Column({
        name: 'email',
        type: 'varchar',
        nullable: true,
    })
    @AutoMap()
    email: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        nullable: false,
    })
    @AutoMap()
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        nullable: false,
    })
    @AutoMap()
    lastName: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at?: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at?: Date;
}
