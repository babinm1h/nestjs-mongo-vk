import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type UserDocument = User & Document;


@Schema({ timestamps: true })
export class User {

    @Prop({ unique: true })
    email: string

    @Prop()
    name: string

    @Prop()
    password: string

    @Prop()
    description: string

    @Prop({ default: 0 })
    subscribersCount: number

    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    subscriptions: Types.ObjectId[]

    @Prop()
    country: string

    @Prop({ default: "https://psy-files.ru/wp-content/uploads/2/7/d/27dfb133b43c3ac998d422cc6c582d22.png" })
    avatar: string

    @Prop()
    banner: string
}


export const UserSchema = SchemaFactory.createForClass(User)