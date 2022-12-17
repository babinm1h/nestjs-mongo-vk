/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CommentDocument, Comment } from "./comment.schema";
import { Model, Types } from 'mongoose';
import { CreateCommentDto } from "./dto/createComment.dto";
import { VideoDocument } from "src/videos/video.schema";
export declare class CommentsService {
    private commentModel;
    private videoModel;
    constructor(commentModel: Model<CommentDocument>, videoModel: Model<VideoDocument>);
    create({ text, userId, videoId }: CreateCommentDto): Promise<Comment & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    delete(id: Types.ObjectId): Promise<any>;
    getByVideo(videoId: Types.ObjectId): Promise<Omit<Comment & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
}
