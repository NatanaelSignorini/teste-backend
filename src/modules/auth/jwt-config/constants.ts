export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.JWT_EXPIRESIN || '60m',
};
