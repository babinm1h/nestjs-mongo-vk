/// <reference types="multer" />
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
