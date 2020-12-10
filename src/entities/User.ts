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
    @IsEmail(undefined, {message: 'Must be a valid email address'})
    @Length(1, 255, {message: 'Email is empty'})
    @Column({unique: true})
    email: string;

    @Column({unique: true})
    @Length(3, 255, {message: 'Must be at least 3 characters'})
    username: string;

    @Exclude()
    @Column()
    @Length(6, 255, {message: 'Must be at least 6 characters'})
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
}
