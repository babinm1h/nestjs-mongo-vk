import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "src/videos/video.schema";
import { CommentSchema, Comment } from "./comment.schema";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
    ],
    providers: [CommentsService],
    controllers: [CommentsController]
})

export class CommentsModule { }