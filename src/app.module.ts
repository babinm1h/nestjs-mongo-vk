import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { UsersModule } from './users/users.module';
import { memoryStorage } from 'multer'
import { VideosModule } from './videos/video.module';
import { ServeStaticModule } from "@nestjs/serve-static"
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      serveStaticOptions: { index: false }
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    CommentsModule,
    LikesModule,
    VideosModule,
    MulterModule.register({
      storage: memoryStorage()
    })
  ],
  controllers: [],
  providers: [],
})


export class AppModule { }
