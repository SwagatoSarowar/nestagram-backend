import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const port = process.env.PORT ?? 3030;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation with whitelist (removes the fields that are not in the DTO)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
  console.log(`Application is running on port ${port}...`);
}

bootstrap();
