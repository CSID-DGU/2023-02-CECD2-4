import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
