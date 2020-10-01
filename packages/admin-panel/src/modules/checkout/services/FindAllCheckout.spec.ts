import { FakeCheckoutRepository } from '../repositories/fakes/FakeCheckoutRepository';
import { FakeValidateCheckoutProvider } from '../providers/CheckoutValidateProvider/fakes/FakeValidatePlanProvider';
import { CreateCheckoutService } from './CreateCheckoutService';
import { FindAllCheckoutsService } from './FindAllCheckoutService';

jest.mock('../infra/sequelize/entities/Plan.ts');

describe('Find all Plan', () => {
  it('should be able to find all categories', async () => {
    const fakeCheckoutRepository = new FakeCheckoutRepository();
    const fakeValidateCheckoutProvider = new FakeValidateCheckoutProvider();
    const createCheckoutService = new CreateCheckoutService(
      fakeCheckoutRepository,
      fakeValidateCheckoutProvider
    );

    await createCheckoutService.execute({
      customer_id: '12345678',
      plan_id: '12345678',
      price: 200,
      status: false
    });

    await createCheckoutService.execute({
      customer_id: '12345678',
      plan_id: '12345678',
      price: 200,
      status: false
    });

    await createCheckoutService.execute({
      customer_id: '12345678',
      plan_id: '12345678',
      price: 200,
      status: false
    });

    await createCheckoutService.execute({
      customer_id: '12345678',
      plan_id: '12345678',
      price: 200,
      status: false
    });

    await createCheckoutService.execute({
      customer_id: '12345678',
      plan_id: '12345678',
      price: 200,
      status: false
    });

    const findAllCheckoutService = new FindAllCheckoutsService(
      fakeCheckoutRepository
    );

    const checkouts = await findAllCheckoutService.execute({
      limit: 10,
      offset: 1
    });

    expect(checkouts).toHaveProperty('rows');
    expect(checkouts).toHaveProperty('count');
    expect(checkouts.count).toBe(4);
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
