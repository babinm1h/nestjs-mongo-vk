import { Controller, Param, Put, Request, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { LikesService } from "./likes.service";

@Controller("/likes")
export class LikesController {

    constructor(private likesService: LikesService) { }

    @UseGuards(JwtGuard)
    @Put("/like/:id")
    likeVideo(@Param("id") videoId: Types.ObjectId, @Request() req) {
        return this.likesService.likeVideo(videoId, req.user._id)
    }

    @UseGuards(JwtGuard)
    @Put("/dislike/:id")
    dislikeVideo(@Param("id") videoId: Types.ObjectId, @Request() req) {
        return this.likesService.dislikeVideo(videoId, req.user._id)
    }
}