import { ICreateCustomerAddressDTO } from './ICreateCustomerAddressDTO';

export interface ICustomerValidate {
  result: boolean;
  data?: {
    name: string;
    email: string;
    personal_document: string;
    addresses?: ICreateCustomerAddressDTO[];
  };
}
