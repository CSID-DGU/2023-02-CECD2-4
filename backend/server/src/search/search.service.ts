import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AnalysisCommentService } from '../analysis-comment/analysis-comment.service';
import { ConfigService } from '@nestjs/config';
import { KeywordService } from '../keyword/keyword.service';
import { Keyword } from '../keyword/keyword.entity';
import { Redis } from 'ioredis';
import { RedisToken } from '../redis/redis.provider';

import { getDateString } from 'src/util/date';

@Injectable()
export class SearchService {
  constructor(
    private config: ConfigService,
    private keywordService: KeywordService,
    private commentService: AnalysisCommentService,
    @Inject(RedisToken) private redisStore: Redis,
  ) {}

  /**
   * 인기 있는 키워드 목록을 반환한다. 메인 화면에서 사용됨.
   */
  async getManyPopularKeywords(count: number): Promise<Keyword[]> {
    const key = this.config.get('POPULAR_KEYWORDS_KEY');
    const keyword_ids = (await this.redisStore.zrevrange(key, 0, count)).map(
      (it) => parseInt(it),
    );

    if (keyword_ids.length === 0) return [];
    return await this.keywordService.findManyById(keyword_ids);
  }

  /**
   * 주어진 기간 내 감정 별로 추천 수 최대의 댓글들을 가져온다.
   */
  async getKeywordWithTopCommentsForEmotion(
    keyword_name: string,
    from?: string,
    to?: string,
  ) {
    const keyword = await this.keywordService.findOneByName(keyword_name);
    if (!keyword) throw new NotFoundException('keyword not found');
    // redis로 순위 따지기!
    const key = this.config.get('POPULAR_KEYWORDS_KEY');
    await this.redisStore.zincrby(key, 1, keyword.id);
    const comments =
      await this.commentService.findTopSympathyCommentsForEachEmotion(
        keyword.id,
        from,
        to,
      );
    const { id, name } = keyword;
    return {
      keyword: {
        id,
        name,
      },
      comments,
    };
  }

  /**
   * 최근 인기 키워드 목록을 초기화
   */
  async clearPopularKeywords() {
    const key = this.config.get('POPULAR_KEYWORDS_KEY');
    return await this.redisStore.del(key);
  }

  /**
   * 댓글을 관련된 문장과 함께 가져오기
   */
  async getCommentWithSentences(id: number) {
    const commentWithSentences = await this.commentService.findOneById(
      id,
      true,
    );
    // if (!commentWithSentences)
    //   throw new NotFoundException(`there is no comment id: ${id}`);
    return commentWithSentences;
  }

  async getCommentList(info: {
    keyword_id: number;
    emotion?: string;
    count: number;
    from?: string;
    to?: string;
  }) {
    return await this.commentService.findManyByInfo(info);
  }

  async getCountsEachEmotion(info: {
    keyword_id: number;
    from: string;
    to: string;
  }) {
    const { keyword_id, from, to } = info;
    const comments = await this.commentService.findManyByInfo({
      keyword_id,
      from,
      to,
    });

    // 임시로 데이터를 저장하기 위한 캐시
    const cache = new Map();

    // 댓글 갯수 많아지면 분할 처리 필요. -> 리팩토링
    for (const comment of comments) {
      const date_key = getDateString(comment.createdAt);

      let countsForEachEmotion = cache.get(date_key);

      if (!countsForEachEmotion) {
        countsForEachEmotion = {};
        cache.set(date_key, countsForEachEmotion);
      }

      if (countsForEachEmotion[comment.emotion] === undefined) {
        countsForEachEmotion[comment.emotion] = 0;
      }

      countsForEachEmotion[comment.emotion]++;
    }

    const result: {
      date: string;
      emotions: Record<string, string>;
    }[] = [];

    for (const [key, value] of cache.entries()) {
      result.push({
        date: key,
        emotions: value,
      });
    }

    return result;
  }
}
