/// <reference types="multer" />
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File): Promise<unknown>;
    uploadVideo(file: Express.Multer.File): Promise<unknown>;
}
