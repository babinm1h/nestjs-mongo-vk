import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from 'src/users/user.schema';

export type CommentDocument = Comment & Document;


@Schema({ timestamps: true })
export class Comment {

    @Prop()
    text: string

    @Prop({ type: Types.ObjectId, ref: "User" })
    user: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: "Video" })
    video: Types.ObjectId
}


export const CommentSchema = SchemaFactory.createForClass(Comment)