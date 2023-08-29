import { Test, TestingModule } from '@nestjs/testing';

import { RegisteredTimesService } from '../registered-times.service';
import { RegisteredTimes } from '../entities/registered-times.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegisteredTimesRepository } from '../repositories/registered-times.repository';
import RegisteredTimesMocks from './__mock__/registered-times';
import { Users } from 'src/modules/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('RegisteredTimesService', () => {
  let service: RegisteredTimesService;

  const mockRegisteredTimesRepository = {
    find: jest.fn(),
    createRegister: jest.fn(),
    findAllRegisters: jest.fn(),
    findAllRegisterByUserId: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisteredTimesService,
        RegisteredTimesRepository,
        {
          provide: getRepositoryToken(RegisteredTimes),
          useValue: mockRegisteredTimesRepository,
        },
      ],
    }).compile();

    service = module.get<RegisteredTimesService>(RegisteredTimesService);
  });

  beforeEach(() => {
    mockRegisteredTimesRepository.createRegister.mockReset();
    mockRegisteredTimesRepository.findAllRegisters.mockReset();
    mockRegisteredTimesRepository.findAllRegisterByUserId.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('When search All Registered Times', () => {
  //   it('should be list all registered times', async () => {
  //     const registered = RegisteredTimesMocks.giveAMeAValidRegisteredTimes();
  //     mockRegisteredTimesRepository.find.mockReturnValue([
  //       registered,
  //       registered,
  //     ]);
  //     const registereds = await service.findAllRegisters();
  //     expect(registereds).toHaveLength(2);
  //     expect(mockRegisteredTimesRepository.find).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('When serch Registered Times By Id', () => {
  //   it('should find a existing registered times', async () => {
  //     const registered = RegisteredTimesMocks.giveAMeAValidRegisteredTimes();
  //     mockRegisteredTimesRepository.findAllRegisterByUserId.mockReturnValue(
  //       registered,
  //     );
  //     const userFound = await service.findAllRegisterByUserId(user: Users);
  //     expect(userFound).toMatchObject({ name: registered.user.id });
  //     expect(
  //       mockRegisteredTimesRepository.findAllRegisterByUserId,
  //     ).toHaveBeenCalledTimes(1);
  //   });
  //   it('should return a exception when does not to find a registered times', async () => {
  //     mockRegisteredTimesRepository.findAllRegisterByUserId.mockReturnValue(null);
  //     expect(service.findAllRegisterByUserId(user: Users)).rejects.toBeInstanceOf(NotFoundException);
  //     expect(mockRegisteredTimesRepository.findAllRegisterByUserId).toHaveBeenCalledTimes(1);
  //   });
  // });

  // describe('When create resgitered times', () => {
  //   it('should create a resgitered times', async () => {
  //     const user = UserMocks.giveAMeAValidUser();
  //     mockRepository.save.mockReturnValue(user);
  //     mockRepository.create.mockReturnValue(user);
  //     const savedUser = await service.createUser(user);

  //     expect(savedUser).toMatchObject(user);
  //     expect(mockRepository.create).toBeCalledTimes(1);
  //     expect(mockRepository.save).toBeCalledTimes(1);
  //   });
  //   it('should return a exception when doesnt create a user', async () => {
  //     const user = UserMocks.giveAMeAValidUser();
  //     mockRepository.save.mockReturnValue(null);
  //     mockRepository.create.mockReturnValue(user);

  //     await service.createUser(user).catch((e) => {
  //       expect(e).toBeInstanceOf(InternalServerErrorException);
  //       expect(e).toMatchObject({
  //         message: 'Problem to create a user. Try again',
  //       });
  //     });
  //     expect(mockRepository.create).toBeCalledTimes(1);
  //     expect(mockRepository.save).toBeCalledTimes(1);
  //   });
  // });
});
