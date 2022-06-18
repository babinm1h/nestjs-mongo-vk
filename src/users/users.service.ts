import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from "./user.schema";
import { Model, Types } from 'mongoose'
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getById(id: Types.ObjectId) {
        const user = await this.userModel.findById(id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }


    async updateProfile(authId: Types.ObjectId, dto: UpdateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(authId, { $set: { ...dto } }, { new: true })
        if (!user) throw new NotFoundException('User not found')
        return user
    }


    async getPopular() {
        const popular = await this.userModel.find({ subscribersCount: { $gt: 0 } })
            .sort({ subscribersCount: "desc" }).limit(5)
        return popular
    }
}