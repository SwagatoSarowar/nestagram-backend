import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

interface CustomResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const customResponse: CustomResponse = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: "Internal server error",
    };

    if (exception instanceof HttpException) {
      customResponse.statusCode = exception.getStatus();
      customResponse.response = exception.getResponse();
    } else {
      customResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      customResponse.response =
        (exception as any).message || "Internal server error";
    }

    response.status(customResponse.statusCode).json(customResponse);
  }
}
