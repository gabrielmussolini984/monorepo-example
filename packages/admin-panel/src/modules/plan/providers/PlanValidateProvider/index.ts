import { container } from 'tsyringe';
import { IValidatePlanProvider } from './models/IValidatePlanProvider';
import { ZodValidatePlanProvider } from './implementations/ZodValidatePlanProvider';

container.registerSingleton<IValidatePlanProvider>(
  'ValidatePlanProvider',
  ZodValidatePlanProvider
);
