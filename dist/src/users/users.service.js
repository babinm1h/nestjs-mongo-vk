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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("../videos/video.schema");
const media_service_1 = require("../media/media.service");
let UsersService = class UsersService {
    constructor(userModel, videoModel, mediaService) {
        this.userModel = userModel;
        this.videoModel = videoModel;
        this.mediaService = mediaService;
    }
    async getById(id) {
        const userVideos = await this.videoModel.find({ user: new mongoose_2.Types.ObjectId(id) });
        const totalViews = userVideos.reduce((prev, curr) => prev + curr.views, 0);
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.totalViews = totalViews;
        await user.save();
        return user;
    }
    async updateProfile(authId, dto) {
        const user = await this.userModel.findById(authId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.name = dto.name;
        user.description = dto.description;
        if (dto.country)
            user.country = dto.country;
        if (dto.banner) {
            const banner = this.mediaService.createFile(media_service_1.FileTypes.BANNER, dto.banner);
            user.banner = banner;
        }
        if (dto.avatar) {
            const avatar = this.mediaService.createFile(media_service_1.FileTypes.AVATAR, dto.avatar);
            user.avatar = avatar;
        }
        await user.save();
        return user;
    }
    async getPopular() {
        const popular = await this.userModel.find({ subscribersCount: { $gt: 0 } }).select("name avatar subscribersCount").sort({ subscribersCount: "desc" }).limit(5);
        return popular;
    }
    async toggleSubscribe(userId, authId) {
        const authUser = await this.userModel.findById(authId);
        const candidate = await this.userModel.findById(userId);
        if (authUser.subscriptions.includes(candidate._id)) {
            authUser.subscriptions = authUser.subscriptions.filter(id => String(id) !== String(userId));
            candidate.subscribersCount -= 1;
            candidate.subscribers = candidate.subscribers.filter(id => String(id) !== String(authId));
        }
        else {
            authUser.subscriptions.push(userId);
            candidate.subscribersCount += 1;
            candidate.subscribers.push(authId);
        }
        await candidate.save();
        await authUser.save();
        return candidate._id;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        media_service_1.MediaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map