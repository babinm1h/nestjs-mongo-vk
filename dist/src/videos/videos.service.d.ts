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
