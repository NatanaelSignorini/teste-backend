import { Test, TestingModule } from '@nestjs/testing';

import { RegisteredTimesService } from '../registered-times.service';
import { RegisteredTimesRepository } from '../repositories/registered-times.repository';

describe('RegisteredTimesService', () => {
  let service: RegisteredTimesService;

  const mockRegisteredTimesRepository = {
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
          provide: RegisteredTimesService,
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
});
