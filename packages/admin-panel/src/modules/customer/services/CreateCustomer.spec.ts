import { FakeValidateCustomerProvider } from '../providers/CustomerValidateProvider/fakes/FakeValidateCustomerProvider';
import { FakeCustomerRepository } from '../repositories/fakes/FakeCustomerRepository';
import { CreateCustomerService } from './CreateCustomerService';
import { AppError } from '../../../shared/errors/MainError';

jest.mock('../infra/sequelize/entities/Customer.ts');

describe('Create Customer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeValidateCustomerProvider = new FakeValidateCustomerProvider();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
      fakeValidateCustomerProvider
    );

    const customer = await createCustomerService.execute({
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

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('Gabriel');
    expect(customer.email).toBe('gabrielmussolini@hotmail.com');
    expect(customer.personal_document).toBe('13259208608');
    expect(customer.addresses[0].zip_code).toBe('11680000');
    expect(customer.addresses[0].street).toBe('Rua Avenida Bahia');
    expect(customer.addresses[0].street_number).toBe('111');
    expect(customer.addresses[0].neighborhood).toBe('Pereque Açu');
    expect(customer.addresses[0].city).toBe('Ubatuba');
    expect(customer.addresses[0].state).toBe('SP');
    expect(customer.addresses[0].ddd).toBe('12');
    expect(customer.addresses[0].phone).toBe('997012128');
  });

  it('should not be able to create a new customer because invalid params', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeValidateCustomerProvider = new FakeValidateCustomerProvider();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
      fakeValidateCustomerProvider
    );

    await expect(
      createCustomerService.execute({
        name: '',
        email: '',
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
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new customer because personal document already exists', async () => {
    const fakeCustomerRepository = new FakeCustomerRepository();
    const fakeValidateCustomerProvider = new FakeValidateCustomerProvider();
    const createCustomerService = new CreateCustomerService(
      fakeCustomerRepository,
      fakeValidateCustomerProvider
    );
    await createCustomerService.execute({
      name: 'Teste1',
      email: 'teste@teste.com',
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
    await expect(
      createCustomerService.execute({
        name: 'Teste1',
        email: 'teste@teste.com',
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
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
