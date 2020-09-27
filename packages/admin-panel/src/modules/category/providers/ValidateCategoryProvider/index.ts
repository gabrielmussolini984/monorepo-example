import { container } from 'tsyringe';
import { IValidateCategoryProvider } from './models/IValidateCategoryProvider';
import { ZodValidateCategoryProvider } from './implementations/ZodValidateCategoryProvider';

container.registerSingleton<IValidateCategoryProvider>(
  'ValidateCategoryProvider',
  ZodValidateCategoryProvider
);
