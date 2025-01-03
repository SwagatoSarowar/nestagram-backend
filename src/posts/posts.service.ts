import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  findAll() {
    return "This action returns all posts";
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  create(createPostDto: CreatePostDto) {
    return (
      "This action adds a new post with the following data" +
      JSON.stringify(createPostDto)
    );
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post with ${JSON.stringify(updatePostDto)}`;
  }

  delete(id: number) {
    return `This action removes a #${id} post`;
  }
}
