import { Injectable } from '@nestjs/common';
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import { AccessTokenObj, RefreshTokenObj } from './util/token.type';

@Injectable()
export class TokenValidator {
  constructor() {
    const ajv = new Ajv({ removeAdditional: 'all' });
    // Access Token 구조 정의
    const AccessTokenSchema: JSONSchemaType<AccessTokenObj> = {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
          required: ['id', 'name'],
        },
      },
      required: ['data'],
    };
    // Refresh Token 구조 정의
    const RefreshTokenSchema: JSONSchemaType<RefreshTokenObj> = {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
          required: ['id', 'name'],
        },
        refresh_key: { type: 'string' },
      },
      required: ['data', 'refresh_key'],
    };
    // validation 함수 설정
    this.validateAccessToken = ajv.compile(AccessTokenSchema);
    this.validateRefreshToken = ajv.compile(RefreshTokenSchema);
  }

  declare validateAccessToken: ValidateFunction<AccessTokenObj>;
  declare validateRefreshToken: ValidateFunction<AccessTokenObj>;
}