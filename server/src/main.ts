import './utils/date';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationMiddelware } from 'src/api/middlewares/validation.middleware';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder().setTitle('Nest.js example').setDescription('This is example for nest.js').setVersion('1.0').addBasicAuth().build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}

async function bootstrap() {
  console.log(process.env);

  const app = await NestFactory.create(AppModule);
  app.use(validationMiddelware);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
