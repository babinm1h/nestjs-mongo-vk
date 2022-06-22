import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MediaService } from "src/media/media.service";
import { User, UserSchema } from "src/users/user.schema";
import { Video, VideoSchema } from "./video.schema";
import { VideosService } from "./videos.service";
import { VideosController } from "./videos.controller";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],

    providers: [VideosService, MediaService],
    controllers: [VideosController]
})


export class VideosModule { }