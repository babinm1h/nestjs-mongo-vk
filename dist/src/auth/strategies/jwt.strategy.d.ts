import { ConfigService } from "@nestjs/config";
import { Types } from "mongoose";
import { Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService, configService: ConfigService);
    validate(payload: {
        _id: Types.ObjectId;
    }): Promise<import("../../users/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
export {};
