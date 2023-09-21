import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { createCommentDto } from './dtos/create-comment.dto';
import { GetCommentsQueriesDto } from './dtos/get-comments-query.dto';
import { AnalysisCommentService } from './analysis-comment.service';
import { OutCommentDto } from './dtos/out-comment.dto';
import { ObjectId } from 'mongodb';

@ApiTags('Comment')
@Controller('comment')
export class AnalysisCommentController {
  constructor(private commentService: AnalysisCommentService) {}

  /**
   * 댓글 정보를 받아 DB에 저장, 생성된 댓글 반환
   */
  @Post()
  @ApiResponse({
    description: '생성한 댓글',
    status: 201,
    type: () => OutCommentDto,
  })
  async createComment(@Body() dto: createCommentDto) {
    const comment = await this.commentService.create(dto);
    return comment;
  }

  /**
   * 쿼리 정보 기반으로 댓글 정보 가져옴
   */
  @Get()
  @ApiResponse({
    description: '가져온 댓글 목록',
    status: 200,
    // type: () => [OutCommentDto],
  })
  async getComments(@Query() q: GetCommentsQueriesDto) {
    console.log(q.search, typeof q.search);
    console.log(q.pno, typeof q.pno);
    console.log(q.psize, typeof q.psize);
    return 'hello';
  }

  /**
   * summary: 'param을 id로 하는 댓글 가져옴',
   */
  @Get(':keyword')
  @ApiParam({
    name: 'keyword',
    description: '키워드',
    example: '윤석열',
  })
  async getCommentsById(@Param('keyword') id: ObjectId) {
    return id + 'hello';
  }
}
