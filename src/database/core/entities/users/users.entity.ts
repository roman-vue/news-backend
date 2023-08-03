import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "../news";
import { Comments } from "../comments";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({nullable:true})
    name:string
    @Column({nullable:true})
    email:string
    @Column({nullable:true})
    password:string
    
    @OneToMany(type => News, value => value.user)
    news:News[]

    @OneToMany(type => Comments, value => value.user)
    comments:Comments[]

    @OneToMany(type => Comments, value => value.user)
    likes:Comments[]
}
