import { Model, Types } from "mongoose";
import { UserDocument } from "src/users/user.schema";
import { VideoDocument } from "src/videos/video.schema";
export declare class LikesService {
    private videoModel;
    private userModel;
    constructor(videoModel: Model<VideoDocument>, userModel: Model<UserDocument>);
    likeVideo(videoId: Types.ObjectId, authId: Types.ObjectId): Promise<Types.ObjectId>;
    dislikeVideo(videoId: Types.ObjectId, authId: Types.ObjectId): Promise<Types.ObjectId>;
}
