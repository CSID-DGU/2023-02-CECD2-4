import { BinaryLike, randomBytes } from 'crypto';
import * as pwmodule from './password';

jest.mock('crypto', () => ({
  pbkdf2: jest.fn(
    (
      password: BinaryLike,
      salt: BinaryLike,
      _iterations: number,
      _keylen: number,
      _digest: string,
      callback: (err: Error | null, derivedKey: Buffer) => void,
    ) => {
      const buffer = Buffer.from(password.toString()); // 테스트 텍스트 출력
      callback(null, buffer);
    },
  ),
  randomBytes: jest.fn((size: number) => {
    return Buffer.from('A'.repeat(size));
  }),
}));

describe('func genHash', () => {
  //AAA pattern
  it('should return string', async () => {
    const inputPassword = 'test';
    const inputSalt = 'test';
    const expected = Buffer.from(inputPassword).toString('hex'); // pbkdf2 mock

    const resultPromise = pwmodule.genHash(inputPassword, inputSalt);
    await expect(resultPromise).resolves.toBe(expected);
  });
});

describe('func generatePassword', () => {
  it('should call genHashFunction Once', async () => {
    //Arange
    const input = 'test';
    const genHashSpyFn = jest
      .spyOn(pwmodule, 'genHash')
      .mockImplementation((user_pass, salt) => {
        return new Promise((resolve) => {
          resolve(Buffer.from(user_pass + salt).toString('hex'));
        });
      });
    //Act
    const result = await pwmodule.generatePassword(input);
    console.log(result);
    //Assertion
    expect(genHashSpyFn).toHaveBeenCalled();
    //Restore
    genHashSpyFn.mockRestore();
  });

  it("should return password (join hash and salt with '.')", async () => {
    const input = 'test';
    const expected = [
      Buffer.from(input).toString('hex'), // pbkdf2 mock
      Buffer.from('A'.repeat(16)).toString('hex'), // randomBytes mock
    ].join('.');

    const result = await pwmodule.generatePassword(input);
    expect(result).toBe(expected);
  });
});

describe('func checkPassword', () => {
  it('should return true if password is valid', async () => {
    const input = 'test';
    const salt = randomBytes(16); // mocked
    const stored_password = [
      Buffer.from(input).toString('hex'), // pbkdf2 mock
      salt,
    ].join('.');

    const result = await pwmodule.checkPassword(input, stored_password);
    expect(result).toBeTruthy();
  });

  it('should return false if password is invalid', async () => {
    const input = 'invalid';
    const salt = randomBytes(16); // mocked
    const stored_password = [
      Buffer.from('test').toString('hex'), // pbkdf2 mock
      salt,
    ].join('.');
    //genHash는 pbkdf2 결과 반환.
    //pbkdf2는 mocking 의해 input을 hex string으로 바꿔서 반환
    //두 비밀번호 다르면 틀리다고 판단

    const result = await pwmodule.checkPassword(input, stored_password);
    expect(result).not.toBeTruthy();
  });
});
