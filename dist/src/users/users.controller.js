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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("mongoose");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getById(userId) {
        return this.usersService.getById(userId);
    }
    getPopular() {
        return this.usersService.getPopular();
    }
    toggleSubscribe(userId, req) {
        return this.usersService.toggleSubscribe(userId, req.user._id);
    }
    updateUser(req, body, files) {
        let avatar;
        let banner;
        if (files && files.avatar) {
            avatar = files.avatar[0];
        }
        if (files && files.banner) {
            banner = files.banner[0];
        }
        return this.usersService.updateProfile(req.user._id, Object.assign({ avatar, banner }, body));
    }
};
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("/get/popular"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getPopular", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Put)('/subscribe/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "toggleSubscribe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "banner", maxCount: 1 },
        { name: "avatar", maxCount: 1 },
    ])),
    (0, common_1.Put)("/update"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateUser_dto_1.UpdateUserBody, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map