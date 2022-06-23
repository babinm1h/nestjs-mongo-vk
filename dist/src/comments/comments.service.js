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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./comment.schema");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("../videos/video.schema");
let CommentsService = class CommentsService {
    constructor(commentModel, videoModel) {
        this.commentModel = commentModel;
        this.videoModel = videoModel;
    }
    async create({ text, userId, videoId }) {
        const video = await this.videoModel.findById(videoId);
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        const comment = await this.commentModel.create({ text, video: videoId, user: userId });
        await comment.populate("user", "avatar name");
        video.commentsCount += 1;
        await video.save();
        return comment;
    }
    async delete(id) {
        const comment = await this.commentModel.findByIdAndDelete(id);
        await this.videoModel.findByIdAndUpdate(comment.video, { $inc: { commentsCount: -1 } });
        if (!comment)
            throw new common_1.BadRequestException("Wrong comment id");
        return comment._id;
    }
    async getByVideo(videoId) {
        const comments = await this.commentModel.find({ video: videoId }).populate("user", 'name avatar');
        return comments;
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map