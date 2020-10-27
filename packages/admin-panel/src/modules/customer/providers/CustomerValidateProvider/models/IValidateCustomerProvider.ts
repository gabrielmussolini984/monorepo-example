import { ICustomerValidate } from '@modules/customer/dtos/ICustomerValidate';

export interface IValidateCustomerProvider {
  customerBodyValidate({
    name,
    email,
    personal_document
  }: {
    name: string;
    email: string;
    personal_document: string;
  }): ICustomerValidate;
}
