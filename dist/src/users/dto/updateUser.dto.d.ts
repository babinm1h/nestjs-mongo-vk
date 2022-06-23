/// <reference types="multer" />
export declare class UpdateUserDto {
    readonly name?: string;
    readonly description?: string;
    readonly country?: string;
    readonly avatar?: Express.Multer.File;
    readonly banner?: Express.Multer.File;
}
export declare class UpdateUserBody {
    readonly name?: string;
    readonly description?: string;
    readonly country?: string;
}
