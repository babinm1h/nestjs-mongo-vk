import { CommentDocument, Comment } from "./comment.schema";
import { Model, Types } from 'mongoose';
import { CreateCommentDto } from "./dto/createComment.dto";
import { VideoDocument } from "src/videos/video.schema";
export declare class CommentsService {
    private commentModel;
    private videoModel;
    constructor(commentModel: Model<CommentDocument>, videoModel: Model<VideoDocument>);
    create({ text, userId, videoId }: CreateCommentDto): Promise<Comment & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(id: Types.ObjectId): Promise<any>;
    getByVideo(videoId: Types.ObjectId): Promise<Omit<Comment & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
}
