/// <reference types="multer" />
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
import { Types } from "mongoose";
import { UpdateUserBody } from "./dto/updateUser.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getById(userId: Types.ObjectId): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getPopular(): Promise<(import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    toggleSubscribe(userId: Types.ObjectId, req: any): Promise<any>;
    updateUser(req: any, body: UpdateUserBody, files?: {
        avatar?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
