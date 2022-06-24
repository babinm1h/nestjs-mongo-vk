import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { MediaService } from './media.service';

export enum FileTypes {
  VIDEO = 'video',
  PREVIEW = 'preview',
  AVATAR = 'avatar',
}

@Module({
  imports: [],
  providers: [MediaService, CloudinaryProvider],
  exports: [CloudinaryProvider, MediaService],
})
export class MediaModule {}
