import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { CommentDocument, Comment } from "./comment.schema";
import { Model } from 'mongoose'

@Injectable()
export class CommentsService {

    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) { }



}