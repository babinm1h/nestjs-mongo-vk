/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
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
import { Document, Types } from 'mongoose';
export declare type VideoDocument = Video & Document;
export declare class Video {
    title: string;
    isPublic: boolean;
    views: number;
    description: string;
    user: Types.ObjectId;
    likesCount: number;
    likes: Types.ObjectId[];
    dislikes: Types.ObjectId[];
    preview: string;
    video: string;
    commentsCount: number;
}
export declare const VideoSchema: import("mongoose").Schema<Video, import("mongoose").Model<Video, any, any, any>, {}, {}, any>;
