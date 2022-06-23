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
import { User, UserDocument } from "./user.schema";
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from "./dto/updateUser.dto";
import { VideoDocument } from "src/videos/video.schema";
import { MediaService } from "src/media/media.service";
export declare class UsersService {
    private userModel;
    private videoModel;
    private mediaService;
    constructor(userModel: Model<UserDocument>, videoModel: Model<VideoDocument>, mediaService: MediaService);
    getById(id: Types.ObjectId): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    updateProfile(authId: Types.ObjectId, dto: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getPopular(): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    toggleSubscribe(userId: Types.ObjectId, authId: Types.ObjectId): Promise<any>;
}
