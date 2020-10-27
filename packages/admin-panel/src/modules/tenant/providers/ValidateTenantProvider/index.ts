import { container } from 'tsyringe';
import { IValidateTenantProvider } from './models/IValidateTenantProvider';
import { ZodValidateTenantProvider } from './implementations/ZodValidateTenantProvider';

container.registerSingleton<IValidateTenantProvider>(
  'ValidateCategoryProvider',
  ZodValidateTenantProvider
);
