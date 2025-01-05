import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  title: string;

  @IsString()
  @IsOptional()
  content?: string;
}
