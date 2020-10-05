import { inject, injectable } from 'tsyringe';
import { Subscription } from '@modules/subscription/infra/sequelize/entities/SubscriptionEntity';
import { ISubscriptionRepository } from '@modules/subscription/repositories/ISubscriptionRepository';

interface IRequest {
  offset: number;
  limit: number;
}

@injectable()
export class FindAllSubscriptionsService {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  public async execute({
    offset,
    limit
  }: IRequest): Promise<{
    rows: Subscription[];
    count: number;
  }> {
    const subscriptions = await this.subscriptionRepository.findAndCountAll({
      offset,
      limit
    });

    return subscriptions;
  }
}
