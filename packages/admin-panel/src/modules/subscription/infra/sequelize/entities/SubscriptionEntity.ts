import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  IsUUID,
  DataType,
  Default
} from 'sequelize-typescript';
import { Tenant } from '@modules/tenant/infra/sequelize/entities/Tenant';
import { Checkout } from '@modules/checkout/infra/sequelize/entities/Checkout';

@Table
export class Subscription extends Model<Subscription> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  start_date: Date;

  @Column
  expires_date: Date;

  @Column
  remote_subscription_id: string;

  @ForeignKey(() => Checkout)
  @Column
  checkout_id: string;

  @ForeignKey(() => Tenant)
  @Column
  tenant_id: string;

  @CreatedAt
  readonly created_at: Date;

  @UpdatedAt
  readonly updated_at: Date;

  @BelongsTo(() => Tenant)
  tenant: Tenant;

  @BelongsTo(() => Checkout)
  checkout: Checkout;
}
