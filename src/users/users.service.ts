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


    async toggleSubscribe(userId: Types.ObjectId, authId: Types.ObjectId) {
        const authUser = await this.userModel.findById(authId)
        const candidate = await this.userModel.findById(userId)

        if (authUser.subscriptions.includes(candidate._id)) {
            authUser.subscriptions = authUser.subscriptions.filter(id => String(id) !== String(userId))
            candidate.subscribersCount -= 1

        } else {
            authUser.subscriptions.push(userId)
            candidate.subscribersCount += 1
        }

        await candidate.save()
        await authUser.save()
        return candidate._id
    }
}