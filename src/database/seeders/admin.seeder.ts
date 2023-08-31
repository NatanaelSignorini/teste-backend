import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { ERole, Users } from '../../modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminSeeder implements Seeder {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async seed(): Promise<any> {
    const user = this.userRepository.create({
      id: 1,
      name: 'Admin',
      email: 'admin@test.com',
      role: ERole.ADMIN,
      password: '12345',
    });

    // Insert into the database.
    return this.userRepository.save(user);
  }

  async drop(): Promise<any> {
    return null;
  }
}
