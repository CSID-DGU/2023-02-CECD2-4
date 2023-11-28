import { ApiTags } from '@nestjs/swagger';
import { Query, Controller, Get } from '@nestjs/common';
import { DailyKeywordBigEmotionsCntService } from './daily-keyword-big-emotions-cnt.service';
import { GetdkbeCountReqDto } from './dtos/get-dkbe-counts.dto';

@ApiTags('Daily Keyword Big Emotions Count')
@Controller('daily-keyword-big-emotions-cnt')
export class DailyKeywordBigEmotionsCntController {
  constructor(private service: DailyKeywordBigEmotionsCntService) {}

  /**
   * 키워드에 대해 날짜 별로 저장된 감정 대분류에 대한 댓글 개수 정보들을 가져온다.
   */
  @Get('/')
  async getdkbeCounts(@Query() dto: GetdkbeCountReqDto) {
    const { keyword_id, from, to } = dto;

    const result = await this.service.getdkbmCounts(keyword_id, from, to);
    return result;
  }
}
