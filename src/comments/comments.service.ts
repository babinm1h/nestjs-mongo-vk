import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { CommentDocument, Comment } from "./comment.schema";
import { Model, Types } from 'mongoose'
import { CreateCommentDto } from "./dto/createComment.dto";
import { Video, VideoDocument } from "src/videos/video.schema";

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>
    ) { }

    async create({ text, userId, videoId }: CreateCommentDto) {
        const video = await this.videoModel.findById(videoId)
        if (!video) throw new NotFoundException('Video not found')

        const comment = await this.commentModel.create({ text, video: videoId, user: userId })
        await comment.populate("user", "avatar name")
        video.commentsCount += 1
        await video.save()

        return comment
    }


    async delete(id: Types.ObjectId) {
        const comment = await this.commentModel.findByIdAndDelete(id)
        await this.videoModel.findByIdAndUpdate(comment.video, { $inc: { commentsCount: -1 } })
        if (!comment) throw new BadRequestException("Wrong comment id")
        return comment._id
    }


    async getByVideo(videoId: Types.ObjectId) {
        const comments = await this.commentModel.find({ video: videoId }).populate("user", 'name avatar')
        return comments
    }
}