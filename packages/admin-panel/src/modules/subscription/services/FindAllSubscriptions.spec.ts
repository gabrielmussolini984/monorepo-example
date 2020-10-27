import { FakeSubscriptionRepository } from '../repositories/fakes/FakeSubscriptionRepository';
import { FakeValidateSubscriptionProvider } from '../providers/SubscriptionValidateProvider/fakes/FakeValidateSubscriptionProvider';
import { CreateSubscriptionService } from './CreateSubscriptionService';
import { FindAllSubscriptionsService } from './FindAllSubscriptionsService';

jest.mock('../infra/sequelize/entities/SubscriptionEntity.ts');

describe('Find all Subscription', () => {
  it('should be able to find all Subscription', async () => {
    const fakeSubscriptionRepository = new FakeSubscriptionRepository();
    const fakeValidateSubscriptionProvider = new FakeValidateSubscriptionProvider();
    const createSubscriptionService = new CreateSubscriptionService(
      fakeSubscriptionRepository,
      fakeValidateSubscriptionProvider
    );

    await createSubscriptionService.execute({
      start_date: new Date('2020-02-28'),
      expires_date: new Date('2020-10-28'),
      remote_subscription_id: '123123123',
      checkout_id: '123123123',
      tenant_id: '123123123'
    });

    await createSubscriptionService.execute({
      start_date: new Date('2020-03-28'),
      expires_date: new Date('2020-11-28'),
      remote_subscription_id: '111111111',
      checkout_id: '111111111',
      tenant_id: '111111111'
    });

    await createSubscriptionService.execute({
      start_date: new Date('2020-04-28'),
      expires_date: new Date('2020-11-28'),
      remote_subscription_id: '222222222',
      checkout_id: '222222222',
      tenant_id: '222222222'
    });

    await createSubscriptionService.execute({
      start_date: new Date('2020-05-28'),
      expires_date: new Date('2020-11-28'),
      remote_subscription_id: '333333333',
      checkout_id: '333333333',
      tenant_id: '333333333'
    });

    await createSubscriptionService.execute({
      start_date: new Date('2020-06-28'),
      expires_date: new Date('2020-11-28'),
      remote_subscription_id: '444444444',
      checkout_id: '444444444',
      tenant_id: '444444444'
    });

    const findAllSubscriptionService = new FindAllSubscriptionsService(
      fakeSubscriptionRepository
    );

    const subscriptions = await findAllSubscriptionService.execute({
      limit: 10,
      offset: 1
    });

    expect(subscriptions).toHaveProperty('rows');
    expect(subscriptions).toHaveProperty('count');
    expect(subscriptions.count).toBe(4);
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
