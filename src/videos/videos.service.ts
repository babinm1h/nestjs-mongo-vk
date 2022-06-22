import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { audit } from "rxjs";
import { FileTypes, MediaService } from "src/media/media.service";
import { User, UserDocument } from "src/users/user.schema";
import { CreateVideoDto } from "./dto/createVideo.dto";
import { SearchVideoDto } from "./dto/searchVideo.dto";
import { UpdateVideoDto } from "./dto/updateVideo.dto";
import { Video, VideoDocument } from "./video.schema";


@Injectable()
export class VideosService {

    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private mediaService: MediaService
    ) { }

    async getById(videoId: Types.ObjectId) {
        return await this.videoModel.findByIdAndUpdate(videoId, { $inc: { views: 1 } })
            .populate('user', '-password -email -subscriptions')
    }

    async getStudioVideo(videoId: Types.ObjectId) {
        return await this.videoModel.findById(new Types.ObjectId(videoId))
    }

    async delete(videoId: Types.ObjectId, userId: Types.ObjectId) {
        const video = await this.videoModel.findById(videoId)
        if (video.user !== userId) throw new ForbiddenException("Not allowed")
        return await this.videoModel.findByIdAndDelete(videoId)
    }


    async getMostPopular() {
        const popular = await this.videoModel.find({ views: { $gt: 0 }, isPublic: true })
            .populate('user', 'avatar name').sort({ views: "desc" }).limit(10)
        return popular
    }


    async getAll() {
        return this.videoModel.find({ isPublic: true }).sort({ createdAt: -1 })
            .populate('user', 'avatar name').limit(16)
    }


    async getPopularByUser(userId: Types.ObjectId) {
        const popular = await this.videoModel.find({
            views: { $gt: 0 },
            isPublic: true,
            user: new Types.ObjectId(userId)
        }).sort({ views: "desc" }).limit(10).populate('user',)

        return popular
    }


    async search({ activeSort, searchTerm }: SearchVideoDto) {

        return this.videoModel.find({ title: new RegExp(searchTerm, 'i'), isPublic: true })
            .populate("user", 'avatar name subscribersCount')
    }


    async getByUser(userId: Types.ObjectId) {
        return await this.videoModel.find({ user: new Types.ObjectId(userId), isPublic: true }).populate("user")
            .sort({ createdAt: 'desc' })
    }


    async create(dto: CreateVideoDto) {
        const video = this.mediaService.createFile(FileTypes.VIDEO, dto.video)
        const preview = this.mediaService.createFile(FileTypes.PREVIEW, dto.preview)

        const created = await this.videoModel.create({
            description: dto.description,
            title: dto.title,
            video,
            preview,
            isPublic: JSON.parse(dto.isPublic),
            user: dto.user
        })

        return await created.populate('user', '-password')
    }


    async updateViews(videoId: Types.ObjectId) {
        const video = this.videoModel.findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true })
        if (!video) throw new NotFoundException("Video not found")
        return video
    }


    async getSubscriptions(authId: Types.ObjectId) {
        const a = await this.videoModel.find({}).populate("user", '-password -email') as any
        let videos = [];
        const b = a.filter(v => {
            if (v.user.subscribers.includes(authId)) {
                videos.push(v)
            } else {
                return v
            }
        })

        return videos
    }


    async getStudioVideos(authId: Types.ObjectId) {
        return await this.videoModel.find({ user: authId })
    }

    async updateVideo(dto: UpdateVideoDto) {
        let video = await this.videoModel.findById(dto.videoId)
        if (!video) throw new NotFoundException("video not found")

        video.title = dto.title
        video.description = dto.description
        video.isPublic = JSON.parse(dto.isPublic)
        if (dto.preview) {
            const preview = this.mediaService.createFile(FileTypes.PREVIEW, dto.preview)
            video.preview = preview
        }

        return await video.save()
    }
}