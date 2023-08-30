import { Test, TestingModule } from '@nestjs/testing';

import { RegisteredTimesService } from '../registered-times.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { RegisteredTimesRepository } from '../repositories/registered-times.repository';
import RegisteredTimesMocks from './__mock__/registered-times';
import { ERole } from '../../users/entities/user.entity';
import { EtimeTypes } from '../entities/registered-times.entity';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('RegisteredTimesService', () => {
  let service: RegisteredTimesService;

  const mockRegisteredTimesRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getLatestRegisteredTimeByUserId: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisteredTimesService,
        {
          provide: getRepositoryToken(RegisteredTimesRepository),
          useValue: mockRegisteredTimesRepository,
        },
      ],
    }).compile();

    service = module.get<RegisteredTimesService>(RegisteredTimesService);
  });

  beforeEach(() => {
    mockRegisteredTimesRepository.find.mockReset();
    mockRegisteredTimesRepository.findOne.mockReset();
    mockRegisteredTimesRepository.create.mockReset();
    mockRegisteredTimesRepository.save.mockReset();
    mockRegisteredTimesRepository.update.mockReset();
    mockRegisteredTimesRepository.delete.mockReset();
    mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Admin Role', () => {
    describe('When search All Registered Times', () => {
      it('should be list all registered times', async () => {
        const registeredTimes =
          RegisteredTimesMocks.giveAnArrayOfEmployeesRegisteredTimes();
        mockRegisteredTimesRepository.find.mockReturnValue(registeredTimes);
        const registeres = await service.findAllEmployeeRegisters();
        expect(registeres).toHaveLength(10);
        expect(mockRegisteredTimesRepository.find).toHaveBeenCalledTimes(1);
        expect(mockRegisteredTimesRepository.find).toHaveBeenCalledWith({
          where: {
            user: { role: ERole.EMPLOYEE },
          },
          relations: { user: true },
        });
      });
    });
  });

  describe('When serch Registered Times By Id', () => {
    it('should find the employee registered times', async () => {
      const registeredUserTimes =
        RegisteredTimesMocks.giveAnArrayOfEmployeeRegisteredTimes();
      mockRegisteredTimesRepository.find.mockReturnValue(registeredUserTimes);
      const registeredTimes = await service.findAllRegisterByUserId(
        registeredUserTimes[0].user,
      );

      expect(registeredTimes).toHaveLength(10);
      expect(mockRegisteredTimesRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRegisteredTimesRepository.find).toHaveBeenCalledWith({
        where: { user: { id: registeredUserTimes[0].user.id } },
        relations: { user: true },
      });
    });

    it('should return empty when the employee have not registered yet', async () => {
      mockRegisteredTimesRepository.find.mockReturnValue([]);
      const user = RegisteredTimesMocks.giveAMeAValidEmployee();
      const registeredTimes = await service.findAllRegisterByUserId(user);
      expect(mockRegisteredTimesRepository.find).toHaveBeenCalledWith({
        where: { user: { id: user.id } },
        relations: { user: true },
      });
      expect(registeredTimes).toHaveLength(0);
      expect(mockRegisteredTimesRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When create resgitered times', () => {
    it('should create a registered times', async () => {
      const user = RegisteredTimesMocks.giveAMeAValidEmployee();

      const lastUserRegisteredTime =
        RegisteredTimesMocks.giveAMeAValidRegisteredTime();

      const newRegisteredTime =
        RegisteredTimesMocks.giveAMeAValidRegisteredTimeGreaterThan(
          lastUserRegisteredTime.time_registered,
          user,
        );

      mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId.mockReturnValue(
        lastUserRegisteredTime,
      );

      mockRegisteredTimesRepository.save.mockReturnValue(newRegisteredTime);

      mockRegisteredTimesRepository.findOne.mockReturnValue(newRegisteredTime);

      const savedRegisteredTime = await service.createRegister(user, {
        time_registered: newRegisteredTime.time_registered,
      });

      expect(savedRegisteredTime).toMatchObject(newRegisteredTime);
      expect(
        mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId,
      ).toBeCalledTimes(1);
      expect(mockRegisteredTimesRepository.save).toBeCalledTimes(1);
      expect(mockRegisteredTimesRepository.findOne).toBeCalledTimes(1);

      expect(
        mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId,
      ).toHaveBeenCalledWith(user.id);
      expect(mockRegisteredTimesRepository.save).toHaveBeenCalledWith({
        user,
        time_types: EtimeTypes.Out,
        time_registered: newRegisteredTime.time_registered,
      });
      expect(mockRegisteredTimesRepository.findOne).toHaveBeenCalledWith({
        where: { id: newRegisteredTime.id },
        relations: { user: true },
      });
    });

    it('should throw an error when registered time is earlier than last registered time', async () => {
      const user = RegisteredTimesMocks.giveAMeAValidEmployee();

      const lastUserRegisteredTime =
        RegisteredTimesMocks.giveAMeAValidRegisteredTime();

      const newRegisteredTime =
        RegisteredTimesMocks.giveAMeAValidRegisteredTimeLessThan(
          lastUserRegisteredTime.time_registered,
          user,
        );

      mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId.mockReturnValue(
        lastUserRegisteredTime,
      );

      mockRegisteredTimesRepository.save.mockReturnValue({});

      mockRegisteredTimesRepository.findOne.mockReturnValue({});

      try {
        await service.createRegister(user, {
          time_registered: newRegisteredTime.time_registered,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error).toMatchObject({
          message: 'Date needs to be greater than previous',
        });

        expect(
          mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId,
        ).toBeCalledTimes(1);
        expect(mockRegisteredTimesRepository.save).toBeCalledTimes(0);
        expect(mockRegisteredTimesRepository.findOne).toBeCalledTimes(0);

        expect(
          mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId,
        ).toHaveBeenCalledWith(user.id);
      }
    });

    it('should throw an error when failed to create record', async () => {
      const user = RegisteredTimesMocks.giveAMeAValidEmployee();

      const lastUserRegisteredTime =
        RegisteredTimesMocks.giveAMeAValidRegisteredTime();

      const newRegisteredTime =
        RegisteredTimesMocks.giveAMeAValidRegisteredTimeGreaterThan(
          lastUserRegisteredTime.time_registered,
          user,
        );

      mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId.mockReturnValue(
        lastUserRegisteredTime,
      );

      mockRegisteredTimesRepository.save.mockReturnValue(false);

      mockRegisteredTimesRepository.findOne.mockReturnValue({});

      try {
        await service.createRegister(user, {
          time_registered: newRegisteredTime.time_registered,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error).toMatchObject({
          message: 'Failed to create record',
        });

        expect(
          mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId,
        ).toBeCalledTimes(1);
        expect(mockRegisteredTimesRepository.save).toBeCalledTimes(1);
        expect(mockRegisteredTimesRepository.findOne).toBeCalledTimes(0);

        expect(
          mockRegisteredTimesRepository.getLatestRegisteredTimeByUserId,
        ).toHaveBeenCalledWith(user.id);
        expect(mockRegisteredTimesRepository.save).toHaveBeenCalledWith({
          user,
          time_types: EtimeTypes.Out,
          time_registered: newRegisteredTime.time_registered,
        });
      }
    });
  });
});
