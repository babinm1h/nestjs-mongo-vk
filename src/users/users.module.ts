import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from "./user.schema";
import { Video, VideoSchema } from "src/videos/video.schema";
import { MediaService } from "src/media/media.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
    ],
    providers: [UsersService, MediaService],
    controllers: [UsersController]
})

export class UsersModule { }