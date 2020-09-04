import { ICreateCustomerAddressDTO } from './ICreateCustomerAddressDTO';

export interface ICreateCustomerDTO {
  name: string;
  email: string;
  personal_document: string;
  addresses?: ICreateCustomerAddressDTO[];
}
