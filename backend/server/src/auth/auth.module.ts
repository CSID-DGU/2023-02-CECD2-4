import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [AdminModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, TokenModule],
})
export class AuthModule {}
