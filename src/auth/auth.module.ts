import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "src/users/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJwtConfig } from "config/getJwtConfig";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersService } from "src/users/users.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { Video, VideoSchema } from "src/videos/video.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        })
    ],
    providers: [AuthService, JwtStrategy, UsersService, ConfigService, LocalStrategy],
    controllers: [AuthController]
})

export class AuthModule { }