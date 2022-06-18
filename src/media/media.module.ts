import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";


export enum FileTypes {
    VIDEO = "video",
    PREVIEW = "preview",
    AVATAR = "avatar"
}

@Module({
    imports: [

    ],
    providers: [MediaService]
})

export class MediaModule { }