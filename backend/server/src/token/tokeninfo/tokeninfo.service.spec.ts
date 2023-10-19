import { Test, TestingModule } from '@nestjs/testing';
import Redis from 'ioredis';
import { TokenInfoService } from './tokenInfo.service';
import { RedisToken } from '../../redis/redis.provider';

describe('TokenInfoService', () => {
  let service: TokenInfoService;
  let repo: Redis;
  let _inner_db: Map<string, string>;
  beforeEach(async () => {
    _inner_db = new Map();
    const mocked_Redis = {
      get: jest.fn((key: string) => {
        return _inner_db.get(key) ?? null; // 키 없으면 null 반환
      }),
      set: jest.fn(
        (key: string, value: string /* _EX: string, _expire: number*/) => {
          _inner_db.set(key, value);
          return 'OK';
        },
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenInfoService,
        // TokenInfo Repository mocking
        {
          provide: RedisToken,
          useValue: mocked_Redis,
        },
      ],
    }).compile();

    service = module.get<TokenInfoService>(TokenInfoService);
    repo = module.get(RedisToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  describe('getTokenInfo()', () => {
    /**
     * 토큰 정보가 존재하면 반환
     */
    it('should return tokeninfo if token exist', async () => {
      // Arrange
      const user_id = 1;
      const expected = 'testkey';
      _inner_db.set(`refresh:uid:${user_id}`, expected);
      // Act
      const result = await service.getTokenInfo(user_id);
      // Assert
      expect(repo.get).toBeCalledTimes(1);
      expect(result).toEqual(expected);
    });

    /**
     * 토큰 정보가 없으면 null 반환
     */
    it('should return tokeninfo if token exist', async () => {
      // Arrange
      const user_id = 0;
      // Act
      const result = await service.getTokenInfo(user_id);
      // Assert
      expect(repo.get).toBeCalledTimes(1);
      expect(result).toBeNull();
    });
  });

  describe('updateTokenInfo()', () => {
    it('should return different refresh_key for every call', async () => {
      // Arrange
      const user_id = 1;
      // Act
      const result1 = await service.updateTokenInfo(user_id);
      const result2 = await service.updateTokenInfo(user_id);
      // Assert
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
      expect(result1).not.toEqual(result2);
    });
  });
});
