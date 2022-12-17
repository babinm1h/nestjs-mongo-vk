/// <reference types="multer" />
/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="express-session" />
export declare enum FileTypes {
    VIDEO = "video",
    PREVIEW = "preview",
    AVATAR = "avatar",
    BANNER = "banner"
}
export declare class MediaService {
    createFile(type: FileTypes, file: Express.Multer.File): string;
    image: (file: Express.Multer.File) => Promise<string>;
    video: (file: Express.Multer.File) => Promise<string>;
}
