import { pbkdf2 as _pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';
// import * as thisModule from './password';

const pbkdf2 = promisify(_pbkdf2);

export const genHash = async (user_pass: string, salt: string) => {
  return (await pbkdf2(user_pass, salt, 100000, 32, 'sha512')).toString('hex');
};

export const generatePassword = async (user_pass: string) => {
  const salt = randomBytes(8).toString('hex'); // random salt 생성
  const hash = await genHash(user_pass, salt); // 해시 생성
  return `${hash}.${salt}`; // 해시 + salt 조합한 비밀번호 정보 반환
};

export const checkPassword = async (
  user_pass: string,
  stored_password: string,
) => {
  const [hash, salt] = stored_password.split('.'); // 해시 / salt 분해
  const new_hash = await genHash(user_pass, salt); // 새로 들어 온 비밀번호로 나누기

  return hash === new_hash; // 두 비밀번호 값 비교
};
