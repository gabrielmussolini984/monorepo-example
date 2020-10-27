import { FakeSubscriptionRepository } from '../repositories/fakes/FakeSubscriptionRepository';
import { FakeValidateSubscriptionProvider } from '../providers/SubscriptionValidateProvider/fakes/FakeValidateSubscriptionProvider';
import { DeleteSubscriptionService } from './DeleteSubscriptionService';
import { CreateSubscriptionService } from './CreateSubscriptionService';

jest.mock('../infra/sequelize/entities/SubscriptionEntity.ts');

describe('Delete Subscription', () => {
  it('should be able to delete Subscription', async () => {
    const fakeSubscriptionRepository = new FakeSubscriptionRepository();
    const fakeValidatePlanProvider = new FakeValidateSubscriptionProvider();
    const createSubscriptionService = new CreateSubscriptionService(
      fakeSubscriptionRepository,
      fakeValidatePlanProvider
    );
    const newSubscription = await createSubscriptionService.execute({
      start_date: new Date('2020-02-28'),
      expires_date: new Date('2020-10-28'),
      remote_subscription_id: '123123123',
      checkout_id: '123123123',
      tenant_id: '123123123'
    });

    const deleteSubscriptionService = new DeleteSubscriptionService(
      fakeSubscriptionRepository
    );

    const subscription = await deleteSubscriptionService.execute({
      id: newSubscription.id
    });

    expect(subscription).toBe(1);
  });
});
