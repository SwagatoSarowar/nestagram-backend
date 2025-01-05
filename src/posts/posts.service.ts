import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationQueryDto } from "src/common/pagination/dtos/pagination-query.dto";
import { Paginated } from "src/common/pagination/interfaces/responseInterface";
import { PaginationProvider } from "src/common/pagination/providers/pagination.provider";
import { Repository } from "typeorm";
import { Post } from "../posts/post.entity";
import { CreatePostDto } from "./dtos/create-post.dto";
import { UpdatePostDto } from "./dtos/update-post.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<Paginated<Post>> {
    const result = await this.paginationProvider.paginateQuery(
      paginationQuery,
      this.postRepository,
    );

    return result;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    if (!post)
      throw new HttpException(
        `Post with id ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );

    return this.postRepository.findOneBy({ id });
  }

  create(data: CreatePostDto) {
    return data;
  }

  update(id: number, data: UpdatePostDto) {
    return { message: `This action updates post #${id} with ${data}` };
  }

  delete(id: number) {
    return { message: `This action deletes post #${id}` };
  }
}
