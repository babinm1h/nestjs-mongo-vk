import { Types } from "mongoose"


export class CreateCommentDto {
    readonly text: string
    readonly videoId: Types.ObjectId
    readonly userId: Types.ObjectId
}