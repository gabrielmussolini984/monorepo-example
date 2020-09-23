import { IUserValidate } from '@modules/user/dtos/IUserValidate';

export interface IValidateProvider {
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
