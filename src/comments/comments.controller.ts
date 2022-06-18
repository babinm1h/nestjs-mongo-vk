import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CommentsService } from "./comments.service";

@Controller('/comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    @UseGuards(JwtGuard)
    @Post('/create')
    create() {
        return this.commentsService.create()
    }

    @UseGuards(JwtGuard)
    @Delete('/delete/:id')
    delete(@Param('id') id: Types.ObjectId) {
        return this.commentsService.delete(id)
    }


    @Get('/:id')
    getByVideo(@Param('id') id: Types.ObjectId) {
        return this.commentsService.getByVideo(id)
    }
}