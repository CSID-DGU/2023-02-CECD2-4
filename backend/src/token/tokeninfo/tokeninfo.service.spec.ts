import { Test, TestingModule } from '@nestjs/testing';
import { TokenInfoService } from './tokenInfo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenInfo } from './tokeninfo.entity';
import { Repository } from 'typeorm';

describe('TokenInfoService', () => {
  let service: TokenInfoService;
  let repo: jest.Mocked<Repository<TokenInfo>>;

  const mocked_repo = {
    save: jest.fn((tokenInfo: TokenInfo): Promise<TokenInfo> => {
      const exist_user_id = [1, 2]; // 이전에 존재하던 유저 ID
      const { id, refresh_key, user_id } = tokenInfo;
      if (exist_user_id.every((it) => it != user_id)) {
        return Promise.reject(); // 없는 유저 생성 시 발생하는 에러
        // 원래는 reference key에 의해 발생하는 에러.
      }
      return Promise.resolve({
        id: id ?? 0,
        refresh_key: refresh_key,
        updatedAt: new Date(),
        user_id,
      });
    }),
    findOneBy: jest.fn((where) => {
      const { user_id } = where;

      if (user_id === 1) {
        return Promise.resolve({
          id: 0,
          refresh_key: 'test_refresh',
          updatedAt: new Date(),
          user_id: user_id as number,
        });
      } else {
        return Promise.resolve(null);
      }
    }),
    create: jest.fn(() => new TokenInfo()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenInfoService,
        // TokenInfo Repository mocking
        {
          provide: getRepositoryToken(TokenInfo),
          useValue: mocked_repo,
        },
      ],
    }).compile();

    service = module.get<TokenInfoService>(TokenInfoService);
    repo = module.get(getRepositoryToken(TokenInfo));
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
      expect(repo.findOneBy).toBeCalledTimes(1);
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
      expect(repo.findOneBy).toBeCalledTimes(1);
      expect(result).toBeNull();
    });

    it('should throw error if user_id is not valid', async () => {
      const promise = service.getTokenInfo();

      await expect(promise).rejects.toThrowError('User Not Defined');
    });
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
      expect(repo.create).not.toBeCalled(); // 있던 것 사용
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
      expect(repo.create).toBeCalledTimes(1); // 새로 생성
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
      expect(repo.create).toBeCalledTimes(1); // 새로 생성
    });
  });
});
