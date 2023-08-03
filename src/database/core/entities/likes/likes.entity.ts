import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "../news";
import { Users } from "../users";

@Entity('likes')
export class Likes {
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @ManyToOne(type => News, value => value.likes)
    news:News[]

    @ManyToOne(type => Users, value => value.likes)
    user:Users[]
}
