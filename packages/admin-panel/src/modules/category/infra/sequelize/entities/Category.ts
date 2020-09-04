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

@Table
export class Category extends Model<Category> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  name: string;

  @Column
  description: string | null;

  @ForeignKey(() => Tenant)
  @Column
  tenant_id: string;

  @CreatedAt
  readonly created_at: Date;

  @UpdatedAt
  readonly updated_at: Date;

  @BelongsTo(() => Tenant)
  tenant: Tenant;
}
