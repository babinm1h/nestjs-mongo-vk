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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
const video_schema_1 = require("../videos/video.schema");
let LikesService = class LikesService {
    constructor(videoModel, userModel) {
        this.videoModel = videoModel;
        this.userModel = userModel;
    }
    async likeVideo(videoId, authId) {
        const video = await this.videoModel.findById(videoId);
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        if (video.likes.includes(authId)) {
            video.likes = video.likes.filter(id => String(id) !== String(authId));
            video.likesCount -= 1;
        }
        else if (video.dislikes.includes(authId)) {
            video.dislikes = video.dislikes.filter(id => String(id) !== String(authId));
            video.likes.push(authId);
            video.likesCount += 1;
        }
        else {
            video.likes.push(authId);
            video.likesCount += 1;
        }
        await video.save();
        return authId;
    }
    async dislikeVideo(videoId, authId) {
        const video = await this.videoModel.findById(videoId);
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        if (video.dislikes.includes(authId)) {
            video.dislikes = video.dislikes.filter(id => String(id) !== String(authId));
        }
        else if (video.likes.includes(authId)) {
            video.dislikes.push(authId);
            video.likes = video.likes.filter(id => String(id) !== String(authId));
            video.likesCount -= 1;
        }
        else {
            video.dislikes.push(authId);
        }
        await video.save();
        return authId;
    }
};
LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LikesService);
exports.LikesService = LikesService;
//# sourceMappingURL=likes.service.js.map