import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  PrimaryKey,
  IsUUID,
  ForeignKey,
  BelongsTo,
  Default,
  DataType,
} from 'sequelize-typescript';
import { Customer } from './Customer';

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

@Table
export class CustomerAddress extends Model<CustomerAddress> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  zip_code: string;

  @Column
  street: string;

  @Column
  street_number: string;

  @Column
  street_complement: string;

  @Column
  neighborhood: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  ddd: string;

  @Column
  phone: string;

  @ForeignKey(() => Customer)
  @Column
  customer_id!: string;

  @CreatedAt
  readonly created_at!: Date;

  @UpdatedAt
  readonly updated_at!: Date;

  @BelongsTo(() => Customer)
  customer: Customer;
}
