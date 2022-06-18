import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/user.schema";
import { Video, VideoSchema } from "src/videos/video.schema";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ],

    providers: [LikesService],
    controllers: [LikesController]
})

export class LikesModule { }