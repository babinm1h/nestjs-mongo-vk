import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CreateVideoBodyDto } from "./dto/createVideo.dto";
import { SearchVideoDto } from "./dto/searchVideo.dto";
import { VideosService } from "./video.service";

@Controller("/videos")
export class VideosController {

    constructor(private videosService: VideosService) { }

    @Get('/search')
    search(@Query() dto: SearchVideoDto) {
        return this.videosService.search(dto)
    }

    @Get('/:id')
    getById(@Param("id") videoId: Types.ObjectId) {
        return this.videosService.getById(videoId)
    }

    @Get('/')
    getAll() {
        return this.videosService.getAll()
    }


    @UseGuards(JwtGuard)
    @Delete('/:id')
    delete(@Param('id') videoId: Types.ObjectId, @Request() req) {
        return this.videosService.delete(videoId, req.user._id)
    }


    @Get('/most/popular')
    getMostPopular() {
        return this.videosService.getMostPopular()
    }


    @Get('/most/popular/:id')
    getPopularByUser(@Param("id") userId: Types.ObjectId) {
        return this.videosService.getPopularByUser(userId)
    }


    @UseGuards(JwtGuard)
    @Post('/')
    @UseInterceptors(FileFieldsInterceptor([
        { name: "preview", maxCount: 1 },
        { name: "video", maxCount: 1 }
    ]))
    create(@Request() req, @Body() body: CreateVideoBodyDto, @UploadedFiles() files) {
        const { preview, video } = files
        const { description, isPublic, title } = body
        return this.videosService.create({
            description, isPublic, title,
            preview: preview[0], video: video[0], user: req.user._id
        })
    }


    @Put("/views/:id")
    updateViews(@Param("id") videoId: Types.ObjectId) {
        return this.videosService.updateViews(videoId)
    }
}