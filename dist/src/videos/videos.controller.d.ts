import { Types } from "mongoose";
import { CreateVideoBodyDto } from "./dto/createVideo.dto";
import { SearchVideoDto } from "./dto/searchVideo.dto";
import { UpdateVideoBody } from "./dto/updateVideo.dto";
import { VideosService } from "./videos.service";
export declare class VideosController {
    private videosService;
    constructor(videosService: VideosService);
    getSubscriptions(req: any): Promise<any[]>;
    getStudioVideos(req: any): Promise<(import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    getStudioVideo(videoId: Types.ObjectId): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    search(dto: SearchVideoDto): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    getById(videoId: Types.ObjectId): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    getAll(page: number): Promise<{
        videos: Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        }, never>[];
        totalCount: number;
    }>;
    getByUser(userId: Types.ObjectId): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    getMostPopular(): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    getPopularByUser(userId: Types.ObjectId): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    create(req: any, body: CreateVideoBodyDto, files: any): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    updateViews(videoId: Types.ObjectId): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    delete(videoId: Types.ObjectId, req: any): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    update(videoId: Types.ObjectId, preview: any, { description, isPublic, title }: UpdateVideoBody): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
}
