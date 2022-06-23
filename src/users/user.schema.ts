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

    @Prop({ default: "https://y0utubeq.herokuapp.com/avatar/default.png" })
    avatar: string

    @Prop()
    banner: string

    @Prop({ type: [{ type: Types.ObjectId, ref: "Video" }] })
    likes: Types.ObjectId[]

    @Prop({ type: [{ type: Types.ObjectId, ref: "Video" }] })
    dislikes: Types.ObjectId[]

    @Prop({ default: 0 })
    totalViews: number


    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    subscribers: Types.ObjectId[]
}


export const UserSchema = SchemaFactory.createForClass(User)