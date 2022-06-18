import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose"
import { Model } from 'mongoose'
import { User, UserDocument } from "src/users/user.schema";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcryptjs'
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }


    async validateUser({ email, password }: AuthDto) {
        const user = await this.userModel.findOne({ email }).select('-password')
        if (!user) throw new BadRequestException("User with such email not found")

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) throw new BadRequestException("Wrong password")

        return user
    }


    async register({ email, name, password }: RegisterDto) {
        const candidate = await this.userModel.findOne({ email })
        if (candidate) throw new BadRequestException("This email already in use")

        const hashed = await bcrypt.hash(password, 6)
        const user = await this.userModel.create({ email, password: hashed, name })

        const payload = { _id: user._id }
        const token = this.jwtService.sign(payload, { expiresIn: '30d' })
        return { user, token }
    }


    async login(user: UserDocument) {
        const payload = { _id: user._id }
        const token = this.jwtService.sign(payload, { expiresIn: "30d" })
        return { user, token }
    }

}