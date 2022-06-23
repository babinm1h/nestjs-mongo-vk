import { NestFactory } from '@nestjs/core';
import * as  passport from 'passport';
import { AppModule } from './app.module';
import * as session from "express-session"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  const PORT = process.env.PORT || 7777;
  app.enableCors({
    origin: 'https://animated-taiyaki-a533ea.netlify.app',
    credentials: true
  })
  app.use(session({
    secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(PORT, () => console.log(`${PORT} started`));
}
bootstrap();
