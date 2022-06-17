import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Types } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private usersService: UsersService, configService: ConfigService) {

        super({
            secretOrKey: configService.get("JWT_SERVICE") || 's0mple',
            ignoreExpiration: true,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })

    }


    async validate(payload: { _id: Types.ObjectId }) {
        const user = await this.usersService.getById(payload._id)
        if (!user) throw new UnauthorizedException("Jwt Strategy validate erorr")
        return user
    }
}