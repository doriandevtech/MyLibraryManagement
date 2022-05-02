import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
