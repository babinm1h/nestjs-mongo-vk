import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private AuthService;
    constructor(AuthService: AuthService);
    validate(email: string, password: string): Promise<import("../../users/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
export {};
