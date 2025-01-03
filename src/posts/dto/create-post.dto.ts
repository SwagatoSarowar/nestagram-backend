import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;
}
