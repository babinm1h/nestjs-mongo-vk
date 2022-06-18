import { Injectable } from "@nestjs/common";
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
        
    }


    async dislikeVideo(videoId: Types.ObjectId, authId: Types.ObjectId) {

    }
}