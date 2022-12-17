import { Model, Types } from 'mongoose';
import { MediaService } from 'src/media/media.service';
import { UserDocument } from 'src/users/user.schema';
import { CreateVideoDto } from './dto/createVideo.dto';
import { SearchVideoDto } from './dto/searchVideo.dto';
import { UpdateVideoDto } from './dto/updateVideo.dto';
import { Video, VideoDocument } from './video.schema';
export declare class VideosService {
    private videoModel;
    private userModel;
    private mediaService;
    constructor(videoModel: Model<VideoDocument>, userModel: Model<UserDocument>, mediaService: MediaService);
    getById(videoId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    getStudioVideo(videoId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    delete(videoId: Types.ObjectId, userId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    getMostPopular(): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    getAll(page: number, limit?: number): Promise<{
        videos: Omit<Video & import("mongoose").Document<any, any, any> & {
            _id: Types.ObjectId;
        }, never>[];
        totalCount: number;
    }>;
    getPopularByUser(userId: Types.ObjectId): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    search({ activeSort, searchTerm }: SearchVideoDto): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    getByUser(userId: Types.ObjectId): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>[]>;
    create(dto: CreateVideoDto): Promise<Omit<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }, never>>;
    updateViews(videoId: Types.ObjectId): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    getSubscriptions(authId: Types.ObjectId): Promise<any[]>;
    getStudioVideos(authId: Types.ObjectId): Promise<(Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    updateVideo(dto: UpdateVideoDto): Promise<Video & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
}
