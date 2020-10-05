import { FakeSubscriptionRepository } from '../repositories/fakes/FakeSubscriptionRepository';
import { FakeValidateSubscriptionProvider } from '../providers/SubscriptionValidateProvider/fakes/FakeValidateSubscriptionProvider';
import { CreateSubscriptionService } from './CreateSubscriptionService';
import { UpdateSubscriptionService } from './UpdateSubscriptionService';

jest.mock('../infra/sequelize/entities/SubscriptionEntity.ts');

describe('Update Subscription', () => {
  it('should be able to update Subscription', async () => {
    const fakeSubscriptionRepository = new FakeSubscriptionRepository();
    const fakeValidateSubscriptionProvider = new FakeValidateSubscriptionProvider();
    const createSubscriptionService = new CreateSubscriptionService(
      fakeSubscriptionRepository,
      fakeValidateSubscriptionProvider
    );

    const newSubscription = await createSubscriptionService.execute({
      start_date: new Date('2020-06-28'),
      expires_date: new Date('2020-11-28'),
      remote_subscription_id: '444444444',
      checkout_id: '444444444',
      tenant_id: '444444444'
    });

    const updateSubscriptionService = new UpdateSubscriptionService(
      fakeSubscriptionRepository
    );

    const subscriptionUpdated = await updateSubscriptionService.execute({
      start_date: new Date('2020-06-28'),
      expires_date: new Date('2020-11-28'),
      remote_subscription_id: '444444444',
      checkout_id: '444444444',
      id: newSubscription.id
    });
    expect(subscriptionUpdated).toEqual(expect.arrayContaining([1]));
  });
});
