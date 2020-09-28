import { container } from 'tsyringe';
import { IValidateCustomerProvider } from './models/IValidateCustomerProvider';
import { ZodValidateCustomerProvider } from './implementations/ZodValidateCustomerProvider';

container.registerSingleton<IValidateCustomerProvider>(
  'ValidateCustomerProvider',
  ZodValidateCustomerProvider
);
