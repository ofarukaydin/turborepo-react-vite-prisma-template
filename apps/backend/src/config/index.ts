/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppError } from '@backend/utils/error';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  validateOrReject,
} from 'class-validator';
import Container, { Service } from 'typedi';

export enum NodeEnvironment {
  development = 'development',
  production = 'production',
  test = 'test',
}

@Service()
export class ConfigService {
  @IsEnum(NodeEnvironment)
  public env = process.env.NODE_ENV as NodeEnvironment;

  @IsNumber({ allowNaN: false })
  public port = parseInt(process.env.BACKEND_PORT!);

  @IsNotEmpty()
  public apolloStudioUrl = process.env.BACKEND_APOLLO_STUDIO_URL!;

  @IsNotEmpty()
  public frontendUrl = process.env.FRONTEND_URL!;

  @IsNotEmpty()
  public sqlitePath = process.env.BACKEND_DATABASE_URL!;
}

validateOrReject(Container.get(ConfigService), {
  validationError: {
    target: false,
  },
}).catch((errors) => {
  console.log(errors);
  throw new AppError({
    message: '',
    stack: 'ERROR: Check env variables',
  });
});
