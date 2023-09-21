import { IntersectionType } from '@nestjs/swagger';
import { createCommentDto } from './create-comment.dto';

class KeyProps {
  /**
   * mongodb 기준 키. 문자열로 변환됨
   */
  key: string;
}

export class OutCommentDto extends IntersectionType(
  createCommentDto,
  KeyProps,
) {}
