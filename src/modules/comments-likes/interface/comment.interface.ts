import { News, Users } from "src/database/core/entities"

export class IComments {
    content:string
    news:News
    user:Users
}
