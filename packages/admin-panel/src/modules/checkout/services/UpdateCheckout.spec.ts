import { FakeCheckoutRepository } from '../repositories/fakes/FakeCheckoutRepository';
import { FakeValidateCheckoutProvider } from '../providers/CheckoutValidateProvider/fakes/FakeValidateCheckoutProvider';
import { CreateCheckoutService } from './CreateCheckoutService';
import { UpdateCheckoutService } from './UpdateCheckoutService';

jest.mock('../infra/sequelize/entities/Checkout.ts');

describe('Update Checkout', () => {
  it('should be able to update Checkout', async () => {
    const fakeCheckoutRepository = new FakeCheckoutRepository();
    const fakeValidateCheckoutProvider = new FakeValidateCheckoutProvider();
    const createCheckoutService = new CreateCheckoutService(
      fakeCheckoutRepository,
      fakeValidateCheckoutProvider
    );

    const newCheckout = await createCheckoutService.execute({
      customer_id: '123123123',
      status: false,
      price: 200,
      plan_id: '123123123'
    });

    const updateCheckoutService = new UpdateCheckoutService(
      fakeCheckoutRepository
    );

    const checkoutUpdated = await updateCheckoutService.execute({
      customer_id: '111111111',
      status: false,
      price: 200,
      plan_id: '111111111',
      id: newCheckout.id
    });
    expect(checkoutUpdated).toEqual(expect.arrayContaining([1]));
  });
});
