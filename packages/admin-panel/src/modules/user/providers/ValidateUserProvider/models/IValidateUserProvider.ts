import { IUserValidate } from '@modules/user/dtos/IUserValidate';

export interface IValidateUserProvider {
  userBodyValidate({
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
    tenant_id: string;
  }): IUserValidate;
}
