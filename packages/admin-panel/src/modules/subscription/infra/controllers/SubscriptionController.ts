/* eslint-disable */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllSubscriptionsService } from '@modules/subscription/services/FindAllSubscriptionsService';
import { CreateSubscriptionService } from '@modules/subscription/services/CreateSubscriptionService';

import { CreatePlanService } from '@modules/plan/services/CreatePlanService';
import { CreateCustomerService } from '@modules/customer/services/CreateCustomerService';
import { ICreateCustomerAddressDTO } from '@modules/customer/dtos/ICreateCustomerAddressDTO';
import { CreateCheckoutService } from '@modules/checkout/services/CreateCheckoutService';
import { CreateTenantService } from '@modules/tenant/services/CreateTenantService';
import { ICreateTenantDTO } from '@modules/tenant/dtos/ITenantCreateDTO';

export class Controller {
  public async index(req: Request, res: Response): Promise<Response> {
    const { length: limit, start: offset } = req.query;
    const findAllSubscriptions = container.resolve(FindAllSubscriptionsService);
    const subscriptions = await findAllSubscriptions.execute({
      offset: Number(offset),
      limit: Number(limit)
    });

    return res.json({
      draw: req.params.draw,
      recordsTotal: subscriptions.count,
      data: subscriptions.rows,
      recordsFiltered: subscriptions.count
    });
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const {
      plan,
      customer,
      address,
      tenant,
      id,
      current_period_start,
      current_period_end
    }: {
      plan: { name: string; id: string; amount: number; days: string };
      customer: { name: string; email: string; document_number: string };
      address: ICreateCustomerAddressDTO;
      tenant: ICreateTenantDTO;
      id: string;
      current_period_start: Date;
      current_period_end: Date;
    } = req.body;

    const createPlan = container.resolve(CreatePlanService);
    const planCreated = await createPlan.execute({
      name: plan.name,
      remote_plan_id: plan.id,
      price: plan.amount,
      billing_cycle: plan.days
    });

    const createCustomer = container.resolve(CreateCustomerService);
    const customerCreated = await createCustomer.execute({
      name: customer.name,
      email: customer.email,
      personal_document: customer.document_number,
      addresses: [address]
    });

    const createCheckoutService = container.resolve(CreateCheckoutService);
    const checkoutCreated = await createCheckoutService.execute({
      customer_id: customerCreated.id,
      plan_id: planCreated.id,
      price: planCreated.price,
      status: true
    });

    const createTenantService = container.resolve(CreateTenantService);
    const tenantCreated = await createTenantService.execute({
      company: tenant.company,
      fallback_subdomain: tenant.fallback_subdomain,
      is_admin: !!tenant.is_admin
    });

    const createSubscription = container.resolve(CreateSubscriptionService);
    const subscriptionCreated = await createSubscription.execute({
      checkout_id: checkoutCreated.id,
      remote_subscription_id: id,
      start_date: current_period_start,
      expires_date: current_period_end,
      tenant_id: tenantCreated.id
    });

    return res.json({ subscription: subscriptionCreated });
  }

  public async update(req: Request, res: Response): Promise<void> {}

  public async delete(req: Request, res: Response): Promise<void> {}
}
