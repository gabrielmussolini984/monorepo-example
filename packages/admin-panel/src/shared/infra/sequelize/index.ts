import { Sequelize } from 'sequelize-typescript';

import { Tenant } from '@modules/tenant/infra/sequelize/entities/Tenant';
import { CustomerAddress } from '@modules/customer/infra/sequelize/entities/CustomerAddress';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { Category } from '@modules/category/infra/sequelize/entities/Category';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';
import { User } from '@modules/user/infra/sequelize/entities/User';
import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';
import { development } from './config.sequelize.js';

export const sequelize = new Sequelize(development);

sequelize.addModels([
  Category,
  Plan,
  Tenant,
  User,
  CustomerAddress,
  Customer,
  Checkout
]);
