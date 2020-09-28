import { FakeCustomerRepository } from '../repositories/fakes/FakeCustomerRepository';
import { FakeValidateCustomerProvider } from '../providers/CustomerValidateProvider/fakes/FakeValidateCustomerProvider';
import { CreateCustomerService } from './CreateCustomerService';
import { FindAllCustomersService } from './FindAllCustomersService';

jest.mock('../infra/sequelize/entities/Customer.ts');

describe('Find all Customer', () => {
  it('should be able to find all categories', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeValidateCustomerProvider = new FakeValidateCustomerProvider();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
      fakeValidateCustomerProvider
    );

    await createCustomerService.execute({
      name: 'Teste 1',
      email: 'teste1@hotmail.com',
      personal_document: '11111111111',
      addresses: [
        {
          zip_code: '11111111',
          street: 'Rua teste 1',
          street_number: '111',
          neighborhood: 'Pereque Açu',
          city: 'Ubatuba',
          state: 'SP',
          ddd: '12',
          phone: '997012128'
        }
      ]
    });

    await createCustomerService.execute({
      name: 'Teste 2',
      email: 'teste2@hotmail.com',
      personal_document: '22222222222',
      addresses: [
        {
          zip_code: '22222222',
          street: 'Rua teste 2',
          street_number: '222',
          neighborhood: 'Pereque Açu',
          city: 'Ubatuba',
          state: 'SP',
          ddd: '12',
          phone: '997012128'
        }
      ]
    });

    await createCustomerService.execute({
      name: 'Teste 3',
      email: 'teste3@hotmail.com',
      personal_document: '33333333333',
      addresses: [
        {
          zip_code: '33333333',
          street: 'Rua teste 3',
          street_number: '333',
          neighborhood: 'Pereque Açu',
          city: 'Ubatuba',
          state: 'SP',
          ddd: '12',
          phone: '997012128'
        }
      ]
    });

    await createCustomerService.execute({
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

    await createCustomerService.execute({
      name: 'Teste 5',
      email: 'teste4@hotmail.com',
      personal_document: '55555555555',
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

    const findAllCustomerService = new FindAllCustomersService(
      fakeCustomerRepository
    );

    const customers = await findAllCustomerService.execute({
      limit: 10,
      offset: 1
    });

    expect(customers).toHaveProperty('rows');
    expect(customers).toHaveProperty('count');
    expect(customers.count).toBe(4);
  });
  // it('should not able to create a new category because name the name can not be null', async () => {});

  // it('should not able to create a new category because name the tenant_id can not be null', async () => {});
  // it('should not able to create a new category because category name is unique', async () => {});
});
