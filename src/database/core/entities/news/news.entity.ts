import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../users";
import { Comments } from "../comments";
import { Likes } from "../likes";

@Entity('news')
export class News {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({nullable:true})
    title:string
    @Column({nullable:true})
    tag:string
    @Column({nullable:true})
    content:string
    @ManyToOne(type => Users, value => value.news)
    user:Users
    @OneToMany(type => Comments, value => value.news)
    comments:Comments[]
    @OneToMany(type => Likes, value => value.news)
    likes:Likes[]
}
