import { ConfigModuleOptions } from '@nestjs/config';
import { Transform, plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

/**
 * .env validation 용도
 */
class EnvironmentVariables {
  @IsString()
  DB_USER: string;
  @IsString()
  DB_PASSWORD: string;
  @IsString()
  DB_DATABASE: string;
  @IsString()
  DB_HOST: string;
  @IsString()
  JWT_ACCESS_SECRET: string;
  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  POPULAR_KEYWORDS_KEY: string;

  @IsString()
  REDIS_HOST: string;
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  REDIS_PORT: number;
}

export const configOption: ConfigModuleOptions = {
  validate: (config: Record<string, unknown>) => {
    const validatedConfig = plainToInstance(EnvironmentVariables, config);

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  },
  isGlobal: true,
};
