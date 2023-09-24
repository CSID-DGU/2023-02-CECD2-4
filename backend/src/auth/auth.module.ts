import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { AuthService } from './auth.service';

@Module({
  imports: [AdminModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
