/// <reference types="multer" />
export declare enum FileTypes {
    VIDEO = "video",
    PREVIEW = "preview",
    AVATAR = "avatar",
    BANNER = "banner"
}
export declare class MediaService {
    createFile(type: FileTypes, file: Express.Multer.File): string;
}
