import { Types } from "mongoose";
import { LikesService } from "./likes.service";
export declare class LikesController {
    private likesService;
    constructor(likesService: LikesService);
    likeVideo(videoId: Types.ObjectId, req: any): Promise<Types.ObjectId>;
    dislikeVideo(videoId: Types.ObjectId, req: any): Promise<Types.ObjectId>;
}
