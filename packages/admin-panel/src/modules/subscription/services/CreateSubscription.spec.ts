import { AppError } from '../../../shared/errors/MainError';
import { FakeSubscriptionRepository } from '../repositories/fakes/FakeSubscriptionRepository';
import { FakeValidateSubscriptionProvider } from '../providers/SubscriptionValidateProvider/fakes/FakeValidateSubscriptionProvider';
import { CreateSubscriptionService } from './CreateSubscriptionService';

jest.mock('../infra/sequelize/entities/SubscriptionEntity.ts');

describe('Create Subscription', () => {
  it('should be able to create a new subscription', async () => {
    const fakeSubscriptionRepository = new FakeSubscriptionRepository();
    const fakeValidateSubscriptionProvider = new FakeValidateSubscriptionProvider();
    const createSubscriptionService = new CreateSubscriptionService(
      fakeSubscriptionRepository,
      fakeValidateSubscriptionProvider
    );

    const subscription = await createSubscriptionService.execute({
      start_date: new Date('2020-02-28'),
      expires_date: new Date('2020-10-28'),
      remote_subscription_id: '123123123',
      checkout_id: '123123123',
      tenant_id: '123123123'
    });

    expect(subscription).toHaveProperty('id');
    expect(subscription.start_date).toEqual(new Date('2020-02-28'));
    expect(subscription.expires_date).toEqual(new Date('2020-10-28'));
    expect(subscription.remote_subscription_id).toBe('123123123');
    expect(subscription.checkout_id).toBe('123123123');
    expect(subscription.tenant_id).toBe('123123123');
  });
  it('should not be able to create a new subscription because invalidi params', async () => {
    const fakeSubscriptionRepository = new FakeSubscriptionRepository();
    const fakeValidateSubscriptionProvider = new FakeValidateSubscriptionProvider();
    const createSubscriptionService = new CreateSubscriptionService(
      fakeSubscriptionRepository,
      fakeValidateSubscriptionProvider
    );
    await expect(
      createSubscriptionService.execute({
        start_date: null,
        expires_date: null,
        remote_subscription_id: null,
        checkout_id: null,
        tenant_id: null
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
