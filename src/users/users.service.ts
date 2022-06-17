import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from "./user.schema";
import { Model, Types } from 'mongoose'

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getById(id: Types.ObjectId) {
        const user = await this.userModel.findById(id)
        if (!user) throw new UnauthorizedException('User not found')
        return user
    }

}