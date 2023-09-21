import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

/**
 * .env validation 용도
 */
class EnvironmentVariables {
  @IsString()
  MONGO_USER: string;
  @IsString()
  MONGO_PASSWORD: string;
  @IsString()
  MONGO_DATABASE: string;
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
