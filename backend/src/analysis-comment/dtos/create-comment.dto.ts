import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDateString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 댓글 생성 관련 dto.
 * 구조는 [analysiscomment](../entity/analysis-comment.entity.ts) 참조.
 */
export class createCommentDto {
  /**
   * 댓글 생성일
   * @example '2022-03-31'
   */
  @IsDateString()
  createdAt: Date;
  /**
   * 댓글 내용
   * @example '오늘은 날씨가 좋아요'
   */
  @IsString()
  content: string;

  /**
   * 공감수
   * @example 10597
   */
  @IsNumber()
  sympathy: number;

  /**
   * 비공감수
   * @example 10597
   */
  @IsNumber()
  antipathy: number;

  /**
   * 뉴스 링크
   * @example https://www.naver.com
   */
  @IsString()
  link: string;

  /**
   * 댓글의 대표 감정
   * @example happiness
   */
  @IsString()
  emotion: string;

  /**
   * 연관성 있는 기사 내 문장들
   */
  @ApiProperty({
    isArray: true,
    type: () => [ArticleContentDto],
  })
  @ValidateNested()
  @Type(() => ArticleContentDto) // nested 처리하기 위한 용도
  news_sentences: [ArticleContentDto];
}

class ArticleContentDto {
  /**
   * 기사 내 문장
   * @example 한편 김창섭 기획실장은 차기 디렉터로...
   */
  @IsString()
  content: string;

  /**
   * 댓글과 기사의 연관도. -1 ~ 1 사이의 값.
   * @example 0.7
   */
  @IsNumber()
  score: number;
}
