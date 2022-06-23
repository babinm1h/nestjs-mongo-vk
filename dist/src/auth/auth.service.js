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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/user.schema");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async validateUser({ email, password }) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.BadRequestException("User with such email not found");
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            throw new common_1.BadRequestException("Wrong password");
        return user;
    }
    async register({ email, name, password }) {
        const candidate = await this.userModel.findOne({ email });
        if (candidate)
            throw new common_1.BadRequestException("This email already in use");
        const hashed = await bcrypt.hash(password, 6);
        const user = await this.userModel.create({ email, password: hashed, name });
        const payload = { _id: user._id };
        const token = this.jwtService.sign(payload, { expiresIn: '30d' });
        return { user, token };
    }
    async login(user) {
        const payload = { _id: user._id };
        const token = this.jwtService.sign(payload, { expiresIn: "30d" });
        return { user, token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map