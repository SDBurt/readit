import { IsEmail, Length } from 'class-validator';
import {Entity as TOEntity, Column, Index, BeforeInsert, OneToMany} from "typeorm";
import bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'

import Entity from './Entity'
import Post from './Posts';

@TOEntity('users')
export default class User extends Entity {

    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user)

    }

    @Index()
    @IsEmail()
    @Column({unique: true})
    email: string;

    @Column({unique: true})
    @Length(3, 255)
    username: string;

    @Exclude()
    @Column()
    @Length(6, 255)
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
}
