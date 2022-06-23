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
