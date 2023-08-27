import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => {
  // console.log({ user, teste: 1 });
  return SetMetadata('roles', roles);
};
