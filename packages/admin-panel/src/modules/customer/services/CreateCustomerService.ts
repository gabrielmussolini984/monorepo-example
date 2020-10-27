import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/MainError';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';
import { ICreateCustomerAddressDTO } from '@modules/customer/dtos/ICreateCustomerAddressDTO';
import { IValidateCustomerProvider } from '@modules/customer/providers/CustomerValidateProvider/models/IValidateCustomerProvider';

interface IRequest {
  name: string;
  email: string;
  personal_document: string;
  addresses: ICreateCustomerAddressDTO[];
}

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
    @inject('ValidateCustomerProvider')
    private validateCustomerProvider: IValidateCustomerProvider
  ) {}

  public async execute({
    name,
    email,
    personal_document,
    addresses
  }: IRequest): Promise<Customer> {
    const validateParams = this.validateCustomerProvider.customerBodyValidate({
      name,
      email,
      personal_document
    });
    if (!validateParams.result)
      throw new AppError('Missing params required', 400);

    const checkCustomerExist = await this.customerRepository.findByPersonalDocument(
      {
        personal_document
      }
    );
    if (checkCustomerExist) throw new AppError('Customer already exists', 400);

    const customer = await this.customerRepository.create({
      name,
      email,
      personal_document,
      addresses
    });

    return customer;
  }
}
