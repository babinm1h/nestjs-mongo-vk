"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const user_schema_1 = require("../users/user.schema");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const getJwtConfig_1 = require("../../config/getJwtConfig");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const users_service_1 = require("../users/users.service");
const local_strategy_1 = require("./strategies/local.strategy");
const video_schema_1 = require("../videos/video.schema");
const media_service_1 = require("../media/media.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: video_schema_1.Video.name, schema: video_schema_1.VideoSchema }]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: getJwtConfig_1.getJwtConfig
            })
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, users_service_1.UsersService, config_1.ConfigService, local_strategy_1.LocalStrategy, media_service_1.MediaService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map