import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from './admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminUser) private adminRepo: Repository<AdminUser>,
  ) {}

  async create(login_id: string, password: string, name: string) {
    const user = this.adminRepo.create({ login_id, password, name });
    try {
      return await this.adminRepo.save(user);
    } catch {
      throw new BadRequestException('user already exist');
    }
  }

  async findById(id: number) {
    if (id == null) {
      // id 값 없는 경우 빈 유저 반환
      return null;
    }
    return this.adminRepo.findOneBy({ id });
  }

  async findByLoginId(login_id: string) {
    if (login_id == null) {
      return null;
    }
    return this.adminRepo.findOne({
      where: {
        login_id: login_id,
      },
    });
  }

  async isExist(login_id: string) {
    return this.adminRepo.exist({
      where: {
        login_id,
      },
    });
  }
}
