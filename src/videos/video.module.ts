import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./video.schema";
import { VideosService } from "./video.service";
import { VideosController } from "./videos.controller";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ],

    providers: [VideosService],
    controllers: [VideosController]
})


export class VideosModule { }