import * as z from 'zod';
import { IUserValidate } from '@modules/user/dtos/IUserValidate';
import { IValidateProvider } from '../models/IValidateProvider';

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(3, { message: 'Must be 5 or more characters long' }),
  tenant_id: z.string().min(3, { message: 'Must be 5 or more characters long' })
});

export class ZodValidateProvider implements IValidateProvider {
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
    if (userSchema.check({ name, email, password, tenant_id }))
      return { result: true, data: { name, email, password, tenant_id } };

    return {
      result: false
    };
  }
}
