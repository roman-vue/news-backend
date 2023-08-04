import { Comments, Likes, Users } from "src/database/core/entities"

export interface INews {
    title:string
    tag:string
    content:string
    user:Users
}
