import { Body, Controller, Get, Param, Put, Request, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { UpdateUserBody, UpdateUserDto } from "./dto/updateUser.dto";
import { UsersService } from "./users.service";

@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get("/:id")
    getById(@Param("id") userId: Types.ObjectId) {
        return this.usersService.getById(userId)
    }

    @Get("/get/popular")
    getPopular() {
        return this.usersService.getPopular()
    }

    @UseGuards(JwtGuard)
    @Put('/subscribe/:id')
    toggleSubscribe(@Param('id') userId: Types.ObjectId, @Request() req) {
        return this.usersService.toggleSubscribe(userId, req.user._id)
    }


    @UseGuards(JwtGuard)
    @UseInterceptors(FileFieldsInterceptor([
        { name: "banner", maxCount: 1 },
        { name: "avatar", maxCount: 1 },
    ]))
    @Put("/update")
    updateUser(@Request() req, @Body() body: UpdateUserBody, @UploadedFiles() files?: {
        avatar?: Express.Multer.File[], banner?: Express.Multer.File[]
    }) {
        let avatar;
        let banner;
        if (files && files.avatar) {
            avatar = files.avatar[0]
        }
        if (files && files.banner) {
            banner = files.banner[0]
        }
        return this.usersService.updateProfile(
            req.user._id, { avatar, banner, ...body }
        )
    }
}