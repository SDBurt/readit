import { Length } from "class-validator";
import {Entity as TOEntity, Column, Index, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Entity from './Entity'

import Post from "./Posts";
import User from "./User";

@TOEntity('subs')
export default class Sub extends Entity {

    constructor(sub: Partial<Sub>) {
        super()
        Object.assign(this, sub)
    }

    @Index()
    @Length(3, 255)
    @Column({unique: true})
    name: string

    @Column()
    @Length(3, 255)
    title: string

    @Column({type: 'text', nullable: true})
    @Length(3, 255)
    description: string
    
    @Column({nullable: true})
    @Length(3, 255)
    imageUrn: string

    @Column({nullable: true})
    @Length(3, 255)
    bannerUrn: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @OneToMany(() => Post, post => post.sub)
    posts: Post[]

}