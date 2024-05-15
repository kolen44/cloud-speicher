import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const userId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id ? Number(request.user.id) : null;
  },
);
