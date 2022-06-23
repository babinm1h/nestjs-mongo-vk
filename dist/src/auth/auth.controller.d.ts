import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: import("../users/user.schema").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        token: string;
    }>;
    login(req: any): Promise<{
        user: import("../users/user.schema").UserDocument;
        token: string;
    }>;
    getAuth(req: any): any;
}
