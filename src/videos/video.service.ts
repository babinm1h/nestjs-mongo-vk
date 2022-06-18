import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { FileTypes, MediaService } from "src/media/media.service";
import { CreateVideoDto } from "./dto/createVideo.dto";
import { SearchVideoDto } from "./dto/searchVideo.dto";
import { Video, VideoDocument } from "./video.schema";


@Injectable()
export class VideosService {

    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        private mediaService: MediaService
    ) { }

    async getById(videoId: Types.ObjectId) {
        return await this.videoModel.findById(videoId).populate('user', '-password -email -subscriptions')
    }


    async delete(videoId: Types.ObjectId, userId: Types.ObjectId) {
        const video = await this.videoModel.findById(videoId)
        if (video.user !== userId) throw new ForbiddenException("Not allowed")
        return await this.videoModel.findByIdAndDelete(videoId)
    }


    async getMostPopular() {
        const popular = await this.videoModel.find({ views: { $gt: 0 }, isPublic: true })
            .sort({ views: "desc" }).limit(10)
        return popular
    }


    async getAll() {
        return this.videoModel.find({ isPublic: true }).sort({ createdAt: -1 })
            .populate('user', '-password')
    }


    async getPopularByUser(userId: Types.ObjectId) {
        const popular = await this.videoModel.find({ views: { $gt: 0 }, isPublic: true, user: userId })
            .sort({ views: "desc" }).limit(10)
        return popular
    }


    async search({ activeSort, searchTerm }: SearchVideoDto) {
        let query = {} as any
        let sort = {} as any

        if (activeSort === 'date') sort.createdAt = -1
        if (activeSort === 'views') sort.views = -1

        if (searchTerm) query.title = new RegExp(searchTerm, 'i')

        return this.videoModel.find({ ...query, isPublic: true }).sort(sort).populate("user", '-password')
    }


    async getByUser(userId: Types.ObjectId) {
        return this.videoModel.find({ user: userId }).sort({ createdAt: 'desc' })
    }


    async create(dto: CreateVideoDto) {
        const video = this.mediaService.createFile(FileTypes.VIDEO, dto.video)
        const preview = this.mediaService.createFile(FileTypes.PREVIEW, dto.preview)

        return await this.videoModel.create({
            description: dto.description,
            title: dto.title,
            video,
            preview,
            isPublic: dto.isPublic || true,
            user: dto.user
        })
    }


    async updateViews(videoId: Types.ObjectId) {
        const video = this.videoModel.findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true })
        if (!video) throw new NotFoundException("Video not found")
        return video
    }


}