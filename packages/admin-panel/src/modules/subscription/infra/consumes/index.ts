import { container } from 'tsyringe';
import { CreateSubscriptionService } from '@modules/subscription/services/CreateSubscriptionService';
import { CreatePlanService } from '@modules/plan/services/CreatePlanService';
import { CreateCustomerService } from '@modules/customer/services/CreateCustomerService';
import { ICreateCustomerAddressDTO } from '@modules/customer/dtos/ICreateCustomerAddressDTO';
import { CreateCheckoutService } from '@modules/checkout/services/CreateCheckoutService';
import { CreateTenantService } from '@modules/tenant/services/CreateTenantService';
import { ICreateTenantDTO } from '@modules/tenant/dtos/ITenantCreateDTO';

export interface IMessageSubscriptionCreate {
  plan: { name: string; id: string; amount: number; days: string };
  customer: { name: string; email: string; document_number: string };
  address: ICreateCustomerAddressDTO;
  tenant: ICreateTenantDTO;
  id: string;
  current_period_start: Date;
  current_period_end: Date;
}
export class SubscriptionConsumers {
  public async store(message: IMessageSubscriptionCreate): Promise<boolean> {
    const {
      plan,
      customer,
      address,
      tenant,
      id,
      current_period_start,
      current_period_end
    } = message;
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
    await createSubscription.execute({
      checkout_id: checkoutCreated.id,
      remote_subscription_id: id,
      start_date: current_period_start,
      expires_date: current_period_end,
      tenant_id: tenantCreated.id
    });
    return true;
  }
}
