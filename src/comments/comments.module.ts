import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema, Comment } from "./comment.schema";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
    ],
    providers: [CommentsService],
    controllers: [CommentsController]
})

export class CommentsModule { }