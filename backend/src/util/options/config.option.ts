import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

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
