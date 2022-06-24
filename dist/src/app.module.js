"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const auth_module_1 = require("./auth/auth.module");
const comments_module_1 = require("./comments/comments.module");
const likes_module_1 = require("./likes/likes.module");
const users_module_1 = require("./users/users.module");
const multer_1 = require("multer");
const videos_module_1 = require("./videos/videos.module");
const serve_static_1 = require("@nestjs/serve-static");
const path = require("path");
const media_module_1 = require("./media/media.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.resolve(__dirname, 'static'),
                serveStaticOptions: { index: false },
            }),
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
            likes_module_1.LikesModule,
            videos_module_1.VideosModule,
            media_module_1.MediaModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map