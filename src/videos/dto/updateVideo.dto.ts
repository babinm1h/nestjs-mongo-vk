import { Types } from "mongoose"


export class UpdateVideoDto {
    readonly title: string
    readonly description: string
    readonly preview?: Express.Multer.File
    readonly isPublic: string
    readonly videoId: Types.ObjectId
}


export class UpdateVideoBody {
    readonly title: string
    readonly description: string
    readonly isPublic: string
}