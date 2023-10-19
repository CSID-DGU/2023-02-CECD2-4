import { Test, TestingModule } from '@nestjs/testing';
import Redis from 'ioredis';
import { TokenInfoService } from './tokenInfo.service';
import { RedisToken } from '../../redis/redis.provider';

describe('TokenInfoService', () => {
  let service: TokenInfoService;
  let repo: Redis;
  beforeEach(async () => {
    const _inner_db = new Map<string, string>();
    const mocked_Redis = {
      get: jest.fn((key: string) => {
        return _inner_db.get(key);
      }),
      set: jest.fn(
        (key: string, value: string, _EX: string, _expire: number) => {
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
      // Act
      const result = await service.getTokenInfo(user_id);
      // Assert
      expect(repo.get).toBeCalledTimes(1);
      expect(result).toBeDefined();
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

    // it('should throw error if user_id is not valid', async () => {
    //   const promise = service.getTokenInfo();

    //   await expect(promise).rejects.toThrowError('User Not Defined');
    // });
  });

  describe('updateTokenInfo()', () => {
    /**
     * 기존에 token info가 이미 존재하는 경우 -> 기존 내용 사용
     */
    it('should update and return token info if exist', async () => {
      // Arrange
      const user_id = 1;
      // Act
      const token_info = await service.updateTokenInfo(user_id);
      // Assert
      expect(token_info).toBeDefined();
    });

    /**
     * token info가 기존에 없는 경우 -> 생성하고 실행됨.
     */
    it('should create and return token info if token not exist', async () => {
      // Arrange
      const user_id = 2;
      // Act
      const result = await service.updateTokenInfo(user_id);
      // Assert
      expect(result).toBeDefined();
    });

    /**
     * 존재하지 않는 user_id로 토큰 생성하는 경우 -> 에러 반환
     */
    it('should throw error if user not exist', async () => {
      // Arrange
      const user_id = 3;
      // Act
      const promise = service.updateTokenInfo(user_id);
      // Assert

      await expect(promise).rejects.toThrowError(); // await 필수
    });
  });
});
