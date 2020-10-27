import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  PrimaryKey,
  IsUUID,
  Default,
  DataType,
  ForeignKey
} from 'sequelize-typescript';
import { Customer } from '@modules/customer/infra/sequelize/entities/Customer';
import { Plan } from '@modules/plan/infra/sequelize/entities/Plan';

@Table
export class Checkout extends Model<Checkout> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  price: number;

  @Column
  status: boolean;

  @ForeignKey(() => Customer)
  @Column
  customer_id: string;

  @ForeignKey(() => Plan)
  @Column
  plan_id: string;

  @CreatedAt
  readonly created_at: Date;

  @UpdatedAt
  readonly updated_at: Date;
}
