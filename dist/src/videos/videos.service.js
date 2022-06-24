"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const media_service_1 = require("../media/media.service");
const user_schema_1 = require("../users/user.schema");
const video_schema_1 = require("./video.schema");
let VideosService = class VideosService {
    constructor(videoModel, userModel, mediaService) {
        this.videoModel = videoModel;
        this.userModel = userModel;
        this.mediaService = mediaService;
    }
    async getById(videoId) {
        return await this.videoModel
            .findByIdAndUpdate(videoId, { $inc: { views: 1 } })
            .populate('user', '-password -email -subscriptions');
    }
    async getStudioVideo(videoId) {
        return await this.videoModel.findById(new mongoose_2.Types.ObjectId(videoId));
    }
    async delete(videoId, userId) {
        const video = await this.videoModel.findById(videoId);
        if (String(video.user) !== String(userId))
            throw new common_1.ForbiddenException('Not allowed');
        return await this.videoModel.findByIdAndDelete(videoId);
    }
    async getMostPopular() {
        const popular = await this.videoModel
            .find({ views: { $gt: 0 }, isPublic: true })
            .populate('user', 'avatar name')
            .sort({ views: 'desc' })
            .limit(10);
        return popular;
    }
    async getAll(page, limit = 12) {
        const videos = await this.videoModel
            .find({ isPublic: true })
            .sort({ createdAt: -1 })
            .skip(page * limit - limit)
            .populate('user', 'avatar name')
            .limit(limit);
        const totalCount = await this.videoModel.find({ isPublic: 'true' }).count();
        return { videos, totalCount };
    }
    async getPopularByUser(userId) {
        const popular = await this.videoModel
            .find({
            views: { $gt: 0 },
            isPublic: true,
            user: new mongoose_2.Types.ObjectId(userId),
        })
            .sort({ views: 'desc' })
            .limit(10)
            .populate('user');
        return popular;
    }
    async search({ activeSort, searchTerm }) {
        return this.videoModel
            .find({ title: new RegExp(searchTerm, 'i'), isPublic: true })
            .populate('user', 'avatar name subscribersCount');
    }
    async getByUser(userId) {
        return await this.videoModel
            .find({ user: new mongoose_2.Types.ObjectId(userId), isPublic: true })
            .populate('user')
            .sort({ createdAt: 'desc' });
    }
    async create(dto) {
        const video = await this.mediaService.video(dto.video);
        const preview = await this.mediaService.image(dto.preview);
        const created = await this.videoModel.create({
            description: dto.description,
            title: dto.title,
            video,
            preview,
            isPublic: JSON.parse(dto.isPublic),
            user: dto.user,
        });
        return await created.populate('user', '-password');
    }
    async updateViews(videoId) {
        const video = this.videoModel.findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true });
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        return video;
    }
    async getSubscriptions(authId) {
        const a = (await this.videoModel
            .find({})
            .populate('user', '-password -email'));
        let videos = [];
        const b = a.filter((v) => {
            if (v.user.subscribers.includes(authId)) {
                videos.push(v);
            }
            else {
                return v;
            }
        });
        return videos;
    }
    async getStudioVideos(authId) {
        return await this.videoModel
            .find({ user: authId })
            .sort({ createdAt: 'desc' });
    }
    async updateVideo(dto) {
        const video = await this.videoModel.findById(dto.videoId);
        if (!video)
            throw new common_1.NotFoundException('video not found');
        video.title = dto.title;
        video.description = dto.description;
        video.isPublic = JSON.parse(dto.isPublic);
        if (dto.preview) {
            const preview = await this.mediaService.image(dto.preview);
            video.preview = preview;
        }
        return await video.save();
    }
};
VideosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        media_service_1.MediaService])
], VideosService);
exports.VideosService = VideosService;
//# sourceMappingURL=videos.service.js.map