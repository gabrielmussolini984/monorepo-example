import { FakeCustomerRepository } from '../repositories/fakes/FakeCustomerRepository';
import { DeleteCustomerService } from './DeleteCustomerService';
import { CreateCustomerService } from './CreateCustomerService';

jest.mock('../infra/sequelize/entities/Customer.ts');

describe('Delete Customer', () => {
  it('should be able to delete customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository
    );
    const newCustomer = await createCustomerService.execute({
      name: 'Gabriel',
      email: 'gabrielmussolini@hotmail.com',
      personal_document: '13259208608',
      addresses: [
        {
          zip_code: '11680000',
          street: 'Rua Avenida Bahia',
          street_number: '111',
          neighborhood: 'Pereque Açu',
          city: 'Ubatuba',
          state: 'SP',
          ddd: '12',
          phone: '997012128'
        }
      ]
    });

    const deleteCustomerService = new DeleteCustomerService(
      fakeCustomerRepository
    );

    const customer = await deleteCustomerService.execute({
      id: newCustomer.id
    });

    expect(customer).toBe(1);
  });
});
