import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { createCommentDto } from './dtos/create-comment.dto';
import { GetCommentsQueriesDto } from './dtos/get-comments-query.dto';
import { AnalysisCommentService } from './analysis-comment.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Comment')
@Controller('comments')
export class AnalysisCommentController {
  constructor(private commentService: AnalysisCommentService) {}

  /**
   * 댓글 정보를 받아 DB에 저장, 생성된 댓글 반환
   */
  @ApiBearerAuth()
  @ApiResponse({
    description: '생성한 댓글',
    status: 201,
  })
  @UseGuards(AuthGuard)
  @Post()
  async createComment(@Body() dto: createCommentDto) {
    const comment = await this.commentService.create(dto);
    return comment;
  }

  /**
   * 쿼리를 지정하여 댓글을 가져올 수 있다.
   */
  @ApiResponse({
    description: '가져온 댓글 목록',
    status: 200,
  })
  @Get()
  async getComments(@Query() queries: GetCommentsQueriesDto) {
    const comments = await this.commentService.findMany(queries);
    return comments;
  }
}
