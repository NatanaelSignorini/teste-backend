import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
// import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const a = await super.canActivate(context);
    // const test = this.getRequest(context);
    console.log({ a });

    return true;
    // return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
