import { FakeCheckoutRepository } from '../repositories/fakes/FakeCheckoutRepository';
import { FakeValidateCheckoutProvider } from '../providers/CheckoutValidateProvider/fakes/FakeValidateCheckoutProvider';
import { DeleteCheckoutService } from './DeleteCheckoutService';
import { CreateCheckoutService } from './CreateCheckoutService';

jest.mock('../infra/sequelize/entities/Checkout.ts');

describe('Delete Checkout', () => {
  it('should be able to delete checkout', async () => {
    const fakeCheckoutRepository = new FakeCheckoutRepository();
    const fakeValidatePlanProvider = new FakeValidateCheckoutProvider();
    const createCheckoutService = new CreateCheckoutService(
      fakeCheckoutRepository,
      fakeValidatePlanProvider
    );
    const newCheckout = await createCheckoutService.execute({
      price: 200,
      status: false,
      customer_id: '123123123',
      plan_id: '123123123'
    });

    const deleteCheckoutService = new DeleteCheckoutService(
      fakeCheckoutRepository
    );

    const checkout = await deleteCheckoutService.execute({
      id: newCheckout.id
    });

    expect(checkout).toBe(1);
  });
});
