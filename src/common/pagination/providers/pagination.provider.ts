import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { ObjectLiteral, Repository } from "typeorm";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { Paginated } from "../interfaces/responseInterface";

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const { limit, page } = paginationQuery;

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);

    const data = await repository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    const { origin, pathname } = new URL(
      this.request.url,
      this.request.protocol + "://" + this.request.get("host"),
    );

    const responseObject: Paginated<T> = {
      data,
      meta: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
      },
      links: {
        current: `${origin}${pathname}?limit=${limit}&page=${page}`,
        first: `${origin}${pathname}?limit=${limit}&page=1`,
        last: `${origin}${pathname}?limit=${limit}&page=${totalPages}`,
        next:
          page < totalPages
            ? `${origin}${pathname}?limit=${limit}&page=${page + 1}`
            : null,
        prev:
          page > 1
            ? `${origin}${pathname}?limit=${limit}&page=${page - 1}`
            : null,
      },
    };

    return responseObject;
  }
}
