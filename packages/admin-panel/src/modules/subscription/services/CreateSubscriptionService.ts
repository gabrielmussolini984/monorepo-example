import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { ICreateSubscriptionDTO } from '@modules/subscription/dtos/ICreateSubscriptionDTO';
import { Subscription } from '@modules/subscription/infra/sequelize/entities/SubscriptionEntity';
import { IValidateSubscriptionProvider } from '@modules/subscription/providers/SubscriptionValidateProvider/models/IValidateSubscriptionProvider';
import { ISubscriptionRepository } from '@modules/subscription/repositories/ISubscriptionRepository';

type IRequest = ICreateSubscriptionDTO;

@injectable()
export class CreateSubscriptionService {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository,
    @inject('ValidateSubscriptionProvider')
    private validateSubscriptionProvider: IValidateSubscriptionProvider
  ) {}

  public async execute({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    tenant_id
  }: IRequest): Promise<Subscription> {
    const validateParams = this.validateSubscriptionProvider.subscriptionBodyValidate(
      {
        start_date,
        expires_date,
        remote_subscription_id,
        checkout_id,
        tenant_id
      }
    );
    if (!validateParams) throw new AppError('Missing params required', 400);

    const example = await this.subscriptionRepository.create({
      start_date,
      expires_date,
      remote_subscription_id,
      checkout_id,
      tenant_id
    });

    return example;
  }
}
