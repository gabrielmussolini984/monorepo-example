import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCustomerService } from '@modules/customer/services/CreateCustomerService';
import { UpdateCustomerService } from '@modules/customer/services/UpdateCustomerService';
import { FindAllCustomersService } from '@modules/customer/services/FindAllCustomersService';
import { DeleteCustomerService } from '@modules/customer/services/DeleteCustomerService';

export interface ICustomerAddress {
  zip_code: string;
  street: string;
  street_number: string;
  street_complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  ddd: string;
  phone: string;
}
export class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { length: limit, start: offset } = req.query;
    const findAllCustomers = container.resolve(FindAllCustomersService);
    const customers = await findAllCustomers.execute({
      offset: Number(offset),
      limit: Number(limit)
    });

    return res.json({
      draw: req.params.draw,
      recordsTotal: customers.count,
      data: customers.rows,
      recordsFiltered: customers.count
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      personal_document,
      zip_code,
      street,
      street_number,
      street_complement = '',
      neighborhood,
      city,
      state,
      ddd,
      phone
    } = req.body;
    const createCustomer = container.resolve(CreateCustomerService);
    await createCustomer.execute({
      name,
      personal_document,
      email,
      addresses: [
        {
          zip_code,
          street,
          street_number,
          street_complement,
          neighborhood,
          city,
          state,
          ddd,
          phone
        }
      ]
    });
    return res.json({ message: 'Category has been create' });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, personal_document } = req.body;
    const { id } = req.params;
    const updateCustomer = container.resolve(UpdateCustomerService);
    await updateCustomer.execute({ name, email, personal_document, id });
    return res.json({ message: 'Customer has been updated ' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCustomer = container.resolve(DeleteCustomerService);
    await deleteCustomer.execute({ id });
    return res.json({ message: 'Customer has been deleted' });
  }
}
