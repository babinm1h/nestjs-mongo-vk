import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import { VideoDocument } from 'src/videos/video.schema';
import { MediaService } from 'src/media/media.service';
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
