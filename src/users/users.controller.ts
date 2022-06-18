import { Body, Controller, Get, Param, Put, Request, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UsersService } from "./users.service";

@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get("/:id")
    getById(@Param("id") userId: Types.ObjectId) {
        return this.usersService.getById(userId)
    }


    @UseGuards(JwtGuard)
    @Put("/update")
    updateUser(@Request() req, @Body() dto: UpdateUserDto) {
        return this.usersService.updateProfile(req.user._id, dto)
    }

    @Get("/get/popular")
    getPopular() {
        return this.usersService.getPopular()
    }
}