import { inject, injectable } from 'tsyringe';
import { Subscription } from '@modules/subscription/infra/sequelize/entities/SubscriptionEntity';
import { ISubscriptionRepository } from '@modules/subscription/repositories/ISubscriptionRepository';

interface IRequest {
  id: string;
  start_date: Date;
  expires_date: Date;
  remote_subscription_id: string;
  checkout_id: string;
}
@injectable()
export class UpdateSubscriptionService {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  public async execute({
    start_date,
    expires_date,
    remote_subscription_id,
    checkout_id,
    id
  }: IRequest): Promise<[number, Subscription[]]> {
    const subscriptionUpdated = await this.subscriptionRepository.update({
      start_date,
      expires_date,
      remote_subscription_id,
      checkout_id,
      id
    });

    return subscriptionUpdated;
  }
}
