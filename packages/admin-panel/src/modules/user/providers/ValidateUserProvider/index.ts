import { container } from 'tsyringe';
import { IValidateUserProvider } from './models/IValidateUserProvider';
import { ZodValidateUserProvider } from './implementations/ZodValidateUserProvider';

container.registerSingleton<IValidateUserProvider>(
  'ValidateUserProvider',
  ZodValidateUserProvider
);
