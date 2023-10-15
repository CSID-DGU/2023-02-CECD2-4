import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateKeywordDto } from './dtos/create-keyword.dto';
import { KeywordService } from './keyword.service';
import { UpdateKeywordDto } from './dtos/update-keyword.dto';
import { Keyword } from './keyword.entity';
import { AuthGuard } from '../auth/auth.guard';
import { AdminParam } from 'src/admin/admin.decorator';
import { IOutAdminUser } from 'src/admin/util/admin.type';

@ApiTags('Keyword')
@Controller('keywords')
export class KeywordController {
  constructor(private keywordService: KeywordService) {}
  /**
   * 키워드를 생성한다.
   */
  @ApiResponse({
    status: 200,
    description: '정상적으로 키워드 생성',
    type: () => Keyword,
  })
  @ApiResponse({
    status: 400,
    description: '이미 저장된 키워드를 삽입하는 경우 에러 발생',
  })
  @ApiResponse({
    status: 401,
    description: '로그인하지 않은 상태',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(200)
  async createKeyword(
    @Body() dto: CreateKeywordDto,
    @AdminParam() admin: IOutAdminUser,
  ) {
    const keyword = await this.keywordService.create(dto, admin.id);
    return keyword;
  }

  /**
   * 키워드를 갱신한다. description 및 isActive 수정 가능
   */
  @ApiResponse({
    status: 200,
    description: '업데이트 한 키워드 반환',
    type: () => Keyword,
  })
  @ApiResponse({
    status: 401,
    description: '로그인하지 않은 상태',
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 키워드 갱신 시 에러 발생',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put()
  async updateKeyword(
    @Body() dto: UpdateKeywordDto,
    @AdminParam() admin: IOutAdminUser,
  ): Promise<Keyword> {
    const keyword = await this.keywordService.update(dto, admin.id);
    return keyword;
  }
  /**
   * 키워드 목록을 반환
   */
  @ApiResponse({
    status: 200,
    description: '존재하는 키워드 목록을 반환한다',
    type: () => Keyword,
  })
  @Get()
  async getKeyword(): Promise<Keyword[]> {
    return await this.keywordService.findMany();
  }
}
