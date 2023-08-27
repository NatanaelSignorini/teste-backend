import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RegisteredTimes } from './entities/registered-times.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRegisteredTimeInput } from './dto/update-registered-times.input';
import { CreateTimeRegisteredInput } from './dto/create-registered-times.input';

@Injectable()
export class RegisteredTimesService {
  //injeta o repositório utilizando a entidade de register
  constructor(
    @InjectRepository(RegisteredTimes)
    private userRepository: Repository<RegisteredTimes>,
  ) {}

  //método para criar o register
  async createRegister(
    data: CreateTimeRegisteredInput,
  ): Promise<RegisteredTimes> {
    const registered_time = this.userRepository.create(data);
    const SavedRegister = await this.userRepository.save(registered_time);
    if (!SavedRegister) {
      throw new InternalServerErrorException('Falha ao criar registro');
    }
    return SavedRegister;
  }

  async findAllRegisters(): Promise<RegisteredTimes[]> {
    const registered_time = await this.userRepository.find();
    return registered_time;
  }

  //método para trazer um registro pelo id
  async findRegisterById(id: number): Promise<RegisteredTimes> {
    const registered_time = await this.userRepository.findOneBy({ id });
    if (!registered_time) {
      throw new NotFoundException('registro nao encontrado');
    }
    return registered_time;
  }

  //método para alterar o registro ponto
  async updateRegister(
    id: number,
    data: UpdateRegisteredTimeInput,
  ): Promise<RegisteredTimes> {
    const registered_time = await this.findRegisterById(id);
    await this.userRepository.update(registered_time, { ...data });
    const registered_timeUpdated = this.userRepository.create({
      ...registered_time,
      ...data,
    });
    return registered_timeUpdated;
  }

  //método para exclusão do registro ponto
  async removeRegister(id: number): Promise<boolean> {
    const registered_time = await this.findRegisterById(id);
    const deleted = await this.userRepository.delete(registered_time);
    if (deleted) {
      return true;
    }
    return false;
  }
}
