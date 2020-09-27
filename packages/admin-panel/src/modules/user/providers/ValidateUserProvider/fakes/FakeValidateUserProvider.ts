import { IUserValidate } from '@modules/user/dtos/IUserValidate';
import { IValidateUserProvider } from '../models/IValidateUserProvider';

export class FakeValidateUserProvider implements IValidateUserProvider {
  public userBodyValidate({
    name,
    email,
    password,
    tenant_id
  }: {
    name: string;
    email: string;
    password: string;
    tenant_id: string;
  }): IUserValidate {
    if (name.length > 5 && email.length > 5 && password.length)
      return { result: true, data: { name, email, password, tenant_id } };
    return { result: false };
  }
}
