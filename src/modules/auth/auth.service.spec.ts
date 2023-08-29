import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import UserMocks from './test/__mock__/user';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
  let service: AuthService;

  const mockUserService = {
    findAllUsers: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: jwtConstants.secret,
            signOptions: {
              expiresIn: '60m',
            },
          }),
        }),
      ],
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    mockUserService.findAllUsers.mockReset();
    mockUserService.getUserByEmail.mockReset();
    mockUserService.getUserById.mockReset();
    mockUserService.createUser.mockReset();
    mockUserService.updateUser.mockReset();
    mockUserService.deleteUser.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When SingIn', () => {
    it('should return a Token when it is a success', async () => {
      const user = UserMocks.giveAMeAValidUser();
      mockUserService.getUserByEmail.mockReturnValue(user);
      const authType = await service.validadeUser({
        email: user.email,
        password: '1234',
      });
      expect(authType.token).not.toBeNull();
      expect(authType.token.length).toEqual(184);
      expect(authType.user).toEqual(user);
    });

    describe('should throw an error when it pass invalid data', () => {
      it('invalid password', async () => {
        const user = UserMocks.giveAMeAValidUser();
        mockUserService.getUserByEmail.mockReturnValue(user);
        try {
          await service.validadeUser({
            email: user.email,
            password: '12345',
          });
        } catch (error) {
          expect(error.message).toEqual('Incorrect User or Password');
          expect(error).toBeInstanceOf(UnauthorizedException);
        }
      });

      it('invalid email', async () => {
        const user = UserMocks.giveAMeAValidUser();
        mockUserService.getUserByEmail.mockReturnValue(user);
        try {
          await service.validadeUser({
            email: 'error',
            password: '1234',
          });
        } catch (error) {
          expect(error.message).toEqual('Incorrect User or Password');
          expect(error).toBeInstanceOf(UnauthorizedException);
        }
      });
    });
  });
});
