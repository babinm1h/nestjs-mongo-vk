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
import { JwtService } from "@nestjs/jwt";
import { Model } from 'mongoose';
import { User, UserDocument } from "src/users/user.schema";
import { RegisterDto } from "./dto/register.dto";
import { AuthDto } from "./dto/auth.dto";
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    validateUser({ email, password }: AuthDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    register({ email, name, password }: RegisterDto): Promise<{
        user: User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        token: string;
    }>;
    login(user: UserDocument): Promise<{
        user: UserDocument;
        token: string;
    }>;
}
