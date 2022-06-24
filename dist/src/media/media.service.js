"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = exports.FileTypes = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const cloudinary_1 = require("cloudinary");
var FileTypes;
(function (FileTypes) {
    FileTypes["VIDEO"] = "video";
    FileTypes["PREVIEW"] = "preview";
    FileTypes["AVATAR"] = "avatar";
    FileTypes["BANNER"] = "banner";
})(FileTypes = exports.FileTypes || (exports.FileTypes = {}));
let MediaService = class MediaService {
    constructor() {
        this.image = async (file) => {
            return new Promise((resolve, reject) => {
                const upload = cloudinary_1.v2.uploader
                    .upload_stream({
                    folder: 'youtube/images',
                }, async (err, result) => {
                    if (err || !result)
                        throw new common_1.BadRequestException('Cloudinary upload error ' + err.message);
                    resolve(result.secure_url);
                })
                    .end(file.buffer);
            });
        };
        this.video = async (file) => {
            return new Promise((resolve, reject) => {
                const upload = cloudinary_1.v2.uploader
                    .upload_stream({
                    folder: 'youtube/videos',
                    resource_type: 'video',
                }, async (err, result) => {
                    if (err || !result)
                        throw new common_1.BadRequestException('Cloudinary upload error ' + err.message);
                    resolve(result.secure_url);
                })
                    .end(file.buffer);
            });
        };
    }
    createFile(type, file) {
        try {
            const fileExt = file.originalname.split('.').pop();
            const fileName = uuid.v4() + `.${fileExt}`;
            const filePath = path.resolve(__dirname, '..', 'static', type);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
            return type + '/' + fileName;
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
MediaService = __decorate([
    (0, common_1.Injectable)()
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map