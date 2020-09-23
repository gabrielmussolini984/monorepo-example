import { container } from 'tsyringe';
import { IValidateProvider } from './models/IValidateProvider';
import { ZodValidateProvider } from './implementations/ZodValidateProvider';

container.registerSingleton<IValidateProvider>(
  'ValidateProvider',
  ZodValidateProvider
);
