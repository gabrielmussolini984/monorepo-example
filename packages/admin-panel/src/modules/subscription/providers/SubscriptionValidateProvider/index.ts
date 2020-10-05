import { container } from 'tsyringe';
import { IValidateSubscriptionProvider } from './models/IValidateSubscriptionProvider';
import { ZodValidateSubscriptionProvider } from './implementations/ZodValidateSubscriptionProvider';

container.registerSingleton<IValidateSubscriptionProvider>(
  'ValidateSubscriptionProvider',
  ZodValidateSubscriptionProvider
);
