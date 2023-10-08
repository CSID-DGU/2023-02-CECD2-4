import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInfo } from './tokeninfo/tokeninfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenInfo])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
