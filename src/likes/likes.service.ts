import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "src/users/user.schema";
import { Video, VideoDocument } from "src/videos/video.schema";

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }


    async likeVideo(videoId: Types.ObjectId, authId: Types.ObjectId) {
        const video = await this.videoModel.findById(videoId)
        if (!video) throw new NotFoundException('Video not found')

        if (video.likes.includes(authId)) {
            video.likes = video.likes.filter(id => String(id) !== String(authId))
            video.likesCount -= 1
        } else if (video.dislikes.includes(authId)) {
            video.dislikes = video.dislikes.filter(id => String(id) !== String(authId))
            video.likes.push(authId)
            video.likesCount += 1
        } else {
            video.likes.push(authId)
            video.likesCount += 1
        }
        await video.save()
        return authId
    }


    async dislikeVideo(videoId: Types.ObjectId, authId: Types.ObjectId) {
        const video = await this.videoModel.findById(videoId)
        if (!video) throw new NotFoundException('Video not found')

        if (video.dislikes.includes(authId)) {
            video.dislikes = video.dislikes.filter(id => String(id) !== String(authId))
        } else if (video.likes.includes(authId)) {
            video.dislikes.push(authId)
            video.likes = video.likes.filter(id => String(id) !== String(authId))
            video.likesCount -= 1
        } else {
            video.dislikes.push(authId)
        }
        await video.save()
        return authId
    }
}