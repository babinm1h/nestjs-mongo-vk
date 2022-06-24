import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { v2 } from 'cloudinary';

export enum FileTypes {
  VIDEO = 'video',
  PREVIEW = 'preview',
  AVATAR = 'avatar',
  BANNER = 'banner',
}

@Injectable()
export class MediaService {
  createFile(type: FileTypes, file: Express.Multer.File): string {
    try {
      const fileExt = file.originalname.split('.').pop();
      const fileName = uuid.v4() + `.${fileExt}`;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  image = async (file: Express.Multer.File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader
        .upload_stream(
          {
            folder: 'youtube/images',
          },
          async (err, result) => {
            if (err || !result)
              throw new BadRequestException(
                'Cloudinary upload error ' + err.message,
              );

            resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  };

  video = async (file: Express.Multer.File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader
        .upload_stream(
          {
            folder: 'youtube/videos',
            resource_type: 'video',
          },
          async (err, result) => {
            if (err || !result)
              throw new BadRequestException(
                'Cloudinary upload error ' + err.message,
              );

            resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  };
}
