import { FakeValidateCustomerProvider } from '../providers/CustomerValidateProvider/fakes/FakeValidateCustomerProvider';
import { FakeCustomerRepository } from '../repositories/fakes/FakeCustomerRepository';
import { CreateCustomerService } from './CreateCustomerService';
import { UpdateCustomerService } from './UpdateCustomerService';

jest.mock('../infra/sequelize/entities/Customer.ts');

describe('Update Customer', () => {
  it('should be able to update Customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeValidateCustomerProvider = new FakeValidateCustomerProvider();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
      fakeValidateCustomerProvider
    );

    const newCustomer = await createCustomerService.execute({
      name: 'Teste 4',
      email: 'teste4@hotmail.com',
      personal_document: '44444444444',
      addresses: [
        {
          zip_code: '44444444',
          street: 'Rua teste 4',
          street_number: '444',
          neighborhood: 'Pereque Açu',
          city: 'Ubatuba',
          state: 'SP',
          ddd: '42',
          phone: '997012128'
        }
      ]
    });

    const updateCustomerService = new UpdateCustomerService(
      fakeCustomerRepository
    );

    const customerUpdated = await updateCustomerService.execute({
      name: 'Teste Editado',
      email: 'testeeditado@hotmail.com',
      personal_document: '11111111111',
      id: newCustomer.id
    });
    expect(customerUpdated).toEqual(expect.arrayContaining([1]));
  });
  // it('should not able to create a new Customer because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
