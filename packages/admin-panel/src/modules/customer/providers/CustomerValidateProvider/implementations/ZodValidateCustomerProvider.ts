import * as z from 'zod';
import { ICustomerValidate } from '@modules/customer/dtos/ICustomerValidate';
import { IValidateCustomerProvider } from '../models/IValidateCustomerProvider';

const customerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 5 or fewer characters long' }),
  email: z.string().email({ message: 'Must be an email' }),
  personal_document: z
    .string()
    .min(3, { message: 'Must be 5 or more characters long' })
});

export class ZodValidateCustomerProvider implements IValidateCustomerProvider {
  public customerBodyValidate({
    name,
    email,
    personal_document
  }: {
    name: string;
    email: string;
    personal_document: string;
  }): ICustomerValidate {
    if (customerSchema.check({ name, email, personal_document }))
      return { result: true, data: { name, email, personal_document } };

    return {
      result: false
    };
  }
}
