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
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("mongoose");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const createVideo_dto_1 = require("./dto/createVideo.dto");
const searchVideo_dto_1 = require("./dto/searchVideo.dto");
const updateVideo_dto_1 = require("./dto/updateVideo.dto");
const videos_service_1 = require("./videos.service");
let VideosController = class VideosController {
    constructor(videosService) {
        this.videosService = videosService;
    }
    getSubscriptions(req) {
        return this.videosService.getSubscriptions(req.user._id);
    }
    getStudioVideos(req) {
        return this.videosService.getStudioVideos(req.user._id);
    }
    getStudioVideo(videoId) {
        return this.videosService.getStudioVideo(videoId);
    }
    search(dto) {
        return this.videosService.search(dto);
    }
    getById(videoId) {
        return this.videosService.getById(videoId);
    }
    getAll(page) {
        return this.videosService.getAll(page);
    }
    getByUser(userId) {
        return this.videosService.getByUser(userId);
    }
    getMostPopular() {
        return this.videosService.getMostPopular();
    }
    getPopularByUser(userId) {
        return this.videosService.getPopularByUser(userId);
    }
    create(req, body, files) {
        const { preview, video } = files;
        const { description, isPublic, title } = body;
        return this.videosService.create({
            description, isPublic, title,
            preview: preview[0], video: video[0], user: req.user._id
        });
    }
    updateViews(videoId) {
        return this.videosService.updateViews(videoId);
    }
    delete(videoId, req) {
        return this.videosService.delete(videoId, req.user._id);
    }
    update(videoId, preview, { description, isPublic, title }) {
        return this.videosService.updateVideo({ videoId, preview, description, isPublic, title });
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/subscriptions/for/auth/user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getSubscriptions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/studio'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getStudioVideos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('/studio/video/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getStudioVideo", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchVideo_dto_1.SearchVideoDto]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Get)('/most/popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getMostPopular", null);
__decorate([
    (0, common_1.Get)('/most/popular/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getPopularByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "preview", maxCount: 1 },
        { name: "video", maxCount: 1 }
    ])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createVideo_dto_1.CreateVideoBodyDto, Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/views/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "updateViews", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('preview')),
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, updateVideo_dto_1.UpdateVideoBody]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "update", null);
VideosController = __decorate([
    (0, common_1.Controller)("/videos"),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map