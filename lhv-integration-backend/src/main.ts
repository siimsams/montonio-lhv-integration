import { Passport } from 'passport';
import { readFileSync } from 'node:fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const passport = new Passport();
  const httpsOptions = {
    key: readFileSync(`${process.env.KEY_LOCATION}`),
    cert: readFileSync(`${process.env.CERT_LOCATION}`),
    requestCert: true,
    rejectUnauthorized: false,
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions 
  });
  app.enableCors({
    origin: `${process.env.FRONT_END_URL}`,
    credentials: true
  });
  app.use(passport.initialize());
  await app.listen(`${process.env.BACK_END_PORT}`);
}
bootstrap();
