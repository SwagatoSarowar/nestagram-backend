import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const port = process.env.PORT ?? 3030;

async function bootstrap() {
  // Create the application/factory
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      // Removes the fields that are not in the DTO
      whitelist: true,
      // Converts the string to the correct type
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Enable CORS
  app.enableCors();

  // Start listening
  await app.listen(port);
}

bootstrap();
