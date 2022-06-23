/// <reference types="multer" />
import { Types } from "mongoose";
export declare class UpdateVideoDto {
    readonly title: string;
    readonly description: string;
    readonly preview?: Express.Multer.File;
    readonly isPublic: string;
    readonly videoId: Types.ObjectId;
}
export declare class UpdateVideoBody {
    readonly title: string;
    readonly description: string;
    readonly isPublic: string;
}
