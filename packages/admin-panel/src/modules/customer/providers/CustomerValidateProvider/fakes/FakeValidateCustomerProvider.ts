import { ICustomerValidate } from '@modules/customer/dtos/ICustomerValidate';
import { IValidateCustomerProvider } from '../models/IValidateCustomerProvider';

export class FakeValidateCustomerProvider implements IValidateCustomerProvider {
  public customerBodyValidate({
    name,
    email,
    personal_document
  }: {
    name: string;
    email: string;
    personal_document: string;
  }): ICustomerValidate {
    if (name.length > 5 && email.length > 5 && personal_document.length > 5)
      return { result: true, data: { name, email, personal_document } };
    return { result: false };
  }
}
