import { Types } from "mongoose";
import { CommentsService } from "./comments.service";
export declare class CommentsController {
    private commentsService;
    constructor(commentsService: CommentsService);
    create(text: string, videoId: Types.ObjectId, req: any): Promise<import("./comment.schema").Comment & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(id: Types.ObjectId): Promise<any>;
    getByVideo(videoId: Types.ObjectId): Promise<Omit<import("./comment.schema").Comment & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
}
