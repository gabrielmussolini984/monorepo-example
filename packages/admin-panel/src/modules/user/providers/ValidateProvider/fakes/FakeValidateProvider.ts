import { IUserValidate } from '@modules/user/dtos/IUserValidate';
import { IValidateProvider } from '../models/IValidateProvider';

export class FakeValidateProvider implements IValidateProvider {
  public userBodyValidate({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  }): IUserValidate {
    if (name?.length > 5 && email?.length > 5 && password?.length)
      return { result: true, data: { name, email, password } };
    return { result: false };
  }
}
