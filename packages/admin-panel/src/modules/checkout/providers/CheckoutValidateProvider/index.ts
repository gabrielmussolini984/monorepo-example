import { container } from 'tsyringe';
import { IValidateCheckoutProvider } from './models/IValidateCheckoutProvider';
import { ZodValidateCheckoutProvider } from './implementations/ZodValidateCheckoutProvider';

container.registerSingleton<IValidateCheckoutProvider>(
  'ValidateCheckoutProvider',
  ZodValidateCheckoutProvider
);
