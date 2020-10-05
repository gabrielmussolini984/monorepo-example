import { inject, injectable } from 'tsyringe';
import { ISubscriptionRepository } from '@modules/subscription/repositories/ISubscriptionRepository';

@injectable()
export class DeleteSubscriptionService {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  public async execute({ id }: { id: string }): Promise<number> {
    const subscriptionDeleted = await this.subscriptionRepository.delete({
      id
    });

    return subscriptionDeleted;
  }
}
