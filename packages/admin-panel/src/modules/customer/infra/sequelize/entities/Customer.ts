import {
  Table,
  Column,
  Model,
  HasMany,
  UpdatedAt,
  CreatedAt,
  PrimaryKey,
  IsUUID,
  DataType,
  Default,
} from 'sequelize-typescript';
import { CustomerAddress, ICustomerAddress } from './CustomerAddress';

export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  personal_document: string;
  addresses?: ICustomerAddress[];
}

@Table
export class Customer extends Model<Customer> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  personal_document: string;

  @CreatedAt
  readonly created_at!: Date;

  @UpdatedAt
  readonly updated_at!: Date;

  @HasMany(() => CustomerAddress)
  addresses: CustomerAddress[];
}
