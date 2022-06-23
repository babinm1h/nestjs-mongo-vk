"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const media_service_1 = require("../media/media.service");
const user_schema_1 = require("../users/user.schema");
const video_schema_1 = require("./video.schema");
const videos_service_1 = require("./videos.service");
const videos_controller_1 = require("./videos.controller");
let VideosModule = class VideosModule {
};
VideosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: video_schema_1.Video.name, schema: video_schema_1.VideoSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
        ],
        providers: [videos_service_1.VideosService, media_service_1.MediaService],
        controllers: [videos_controller_1.VideosController]
    })
], VideosModule);
exports.VideosModule = VideosModule;
//# sourceMappingURL=videos.module.js.map