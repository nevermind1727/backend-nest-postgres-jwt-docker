import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { ValidationPipe } from './pipes/validation.pipe';


async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Advanced Backend')
    .setDescription('It describes how this app works')
    .setVersion('1.0')
    .addTag('nestj', "swagger")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
}
bootstrap();

