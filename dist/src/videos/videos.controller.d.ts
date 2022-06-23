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
        _id: any;
    })[]>;
    getStudioVideo(videoId: Types.ObjectId): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    search(dto: SearchVideoDto): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getById(videoId: Types.ObjectId): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getAll(page: number): Promise<{
        videos: Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
            _id: any;
        }, never>[];
        totalCount: number;
    }>;
    getByUser(userId: Types.ObjectId): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getMostPopular(): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getPopularByUser(userId: Types.ObjectId): Promise<Omit<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    create(req: any, body: CreateVideoBodyDto, files: any): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updateViews(videoId: Types.ObjectId): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    delete(videoId: Types.ObjectId, req: any): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    update(videoId: Types.ObjectId, preview: any, { description, isPublic, title }: UpdateVideoBody): Promise<import("./video.schema").Video & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
