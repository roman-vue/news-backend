import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "../news";
import { Users } from "../users";

@Entity('comments')
export class Comments {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({nullable:true})
    content:string
    
    @ManyToOne(type => News, value => value.comments)
    news:News[]

    @ManyToOne(type => Users, value => value.comments)
    user:Users[]
}
