import { AppError } from '../../../shared/errors/MainError';
import { FakeCheckoutRepository } from '../repositories/fakes/FakeCheckoutRepository';
import { FakeValidateCheckoutProvider } from '../providers/CheckoutValidateProvider/fakes/FakeValidateCheckoutProvider';
import { CreateCheckoutService } from './CreateCheckoutService';

jest.mock('../infra/sequelize/entities/Checkout.ts');

describe('Create Checkout', () => {
  it('should be able to create a new checkout', async () => {
    const fakeCheckoutRepository = new FakeCheckoutRepository();
    const fakeValidateCheckoutProvider = new FakeValidateCheckoutProvider();
    const createCheckoutService = new CreateCheckoutService(
      fakeCheckoutRepository,
      fakeValidateCheckoutProvider
    );

    const checkout = await createCheckoutService.execute({
      customer_id: '12345678',
      plan_id: '12345678',
      price: 200,
      status: false
    });

    expect(checkout).toHaveProperty('id');
    expect(checkout.customer_id).toBe('12345678');
    expect(checkout.plan_id).toBe('12345678');
    expect(checkout.price).toBe(200);
    expect(checkout.status).toBe(false);
  });
  it('should not be able to create a new cehckout because invalidi params', async () => {
    const fakeCheckoutRepository = new FakeCheckoutRepository();
    const fakeValidateCheckoutProvider = new FakeValidateCheckoutProvider();
    const createCheckoutService = new CreateCheckoutService(
      fakeCheckoutRepository,
      fakeValidateCheckoutProvider
    );
    await expect(
      createCheckoutService.execute({
        customer_id: ' ',
        plan_id: '',
        price: null,
        status: null
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
