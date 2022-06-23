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
import { Model, Types } from "mongoose";
import { MediaService } from "src/media/media.service";
import { UserDocument } from "src/users/user.schema";
import { CreateVideoDto } from "./dto/createVideo.dto";
import { SearchVideoDto } from "./dto/searchVideo.dto";
import { UpdateVideoDto } from "./dto/updateVideo.dto";
import { Video, VideoDocument } from "./video.schema";
export declare class VideosService {
    private videoModel;
    private userModel;
    private mediaService;
    constructor(videoModel: Model<VideoDocument>, userModel: Model<UserDocument>, mediaService: MediaService);
    getById(videoId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getStudioVideo(videoId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(videoId: Types.ObjectId, userId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getMostPopular(): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getAll(page: number, limit?: number): Promise<{
        videos: Omit<Video & import("mongoose").Document<any, any, any> & {
            _id: any;
        }, never>[];
        totalCount: number;
    }>;
    getPopularByUser(userId: Types.ObjectId): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    search({ activeSort, searchTerm }: SearchVideoDto): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getByUser(userId: Types.ObjectId): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    create(dto: CreateVideoDto): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updateViews(videoId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getSubscriptions(authId: Types.ObjectId): Promise<any[]>;
    getStudioVideos(authId: Types.ObjectId): Promise<(Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    updateVideo(dto: UpdateVideoDto): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
