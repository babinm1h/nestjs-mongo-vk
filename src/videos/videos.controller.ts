import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CreateVideoBodyDto } from "./dto/createVideo.dto";
import { SearchVideoDto } from "./dto/searchVideo.dto";
import { UpdateVideoBody } from "./dto/updateVideo.dto";
import { VideosService } from "./videos.service";

@Controller("/videos")
export class VideosController {

    constructor(private videosService: VideosService) { }

    @UseGuards(JwtGuard)
    @Get('/subscriptions/for/auth/user')
    getSubscriptions(@Request() req) {
        return this.videosService.getSubscriptions(req.user._id)
    }

    @UseGuards(JwtGuard)
    @Get('/studio')
    getStudioVideos(@Request() req) {
        return this.videosService.getStudioVideos(req.user._id)
    }

    @UseGuards(JwtGuard)
    @Get('/studio/video/:id')
    getStudioVideo(@Param("id") videoId: Types.ObjectId) {
        return this.videosService.getStudioVideo(videoId)
    }

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

    @Get('/user/:id')
    getByUser(@Param("id") userId: Types.ObjectId) {
        return this.videosService.getByUser(userId)
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


    @UseGuards(JwtGuard)
    @Delete('/:id')
    delete(@Param('id') videoId: Types.ObjectId, @Request() req) {
        return this.videosService.delete(videoId, req.user._id)
    }


    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('preview'))
    @Put('/update/:id')
    update(
        @Param('id') videoId: Types.ObjectId,
        @UploadedFile() preview,
        @Body() { description, isPublic, title }: UpdateVideoBody
    ) {
        return this.videosService.updateVideo({ videoId, preview, description, isPublic, title })
    }
}