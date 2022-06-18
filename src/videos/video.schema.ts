import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type VideoDocument = Video & Document;


@Schema({ timestamps: true })
export class Video {

    @Prop({ required: true })
    title: string

    @Prop()
    isPublic: boolean

    @Prop({ default: 0 })
    views: number

    @Prop()
    description: string

    @Prop({ type: Types.ObjectId, ref: "User" })
    user: Types.ObjectId

    @Prop({ default: 0 })
    likesCount: number

    @Prop({ default: 0 })
    dislikesCount: number

    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    likes: Types.ObjectId[]

    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    dislikes: Types.ObjectId[]

    @Prop({ required: true })
    preview: string

    @Prop({ required: true })
    video: string
}


export const VideoSchema = SchemaFactory.createForClass(Video)