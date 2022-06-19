import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CommentsService } from "./comments.service";

@Controller('/comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    @UseGuards(JwtGuard)
    @Post('/:id')
    create(@Body('text') text: string, @Param('id') videoId: Types.ObjectId, @Request() req) {
        return this.commentsService.create({ text, userId: req.user._id, videoId })
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    delete(@Param('id') id: Types.ObjectId) {
        return this.commentsService.delete(id)
    }


    @Get('/video/:id')
    getByVideo(@Param('id') videoId: Types.ObjectId) {
        return this.commentsService.getByVideo(videoId)
    }
}