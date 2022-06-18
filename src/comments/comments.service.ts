import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { CommentDocument, Comment } from "./comment.schema";
import { Model, Types } from 'mongoose'

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) { }

    async create() {

    }


    async delete(id: Types.ObjectId) {
        const comment = await this.commentModel.findByIdAndDelete(id)
        if (!comment) throw new BadRequestException("Wrong id")
        return comment
    }


    async getByVideo(id: Types.ObjectId) {

    }
}