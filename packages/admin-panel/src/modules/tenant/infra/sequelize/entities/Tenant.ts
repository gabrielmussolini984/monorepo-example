import {
  Model,
  Column,
  CreatedAt,
  Table,
  UpdatedAt,
  IsUUID,
  PrimaryKey,
  DataType,
  Default
} from 'sequelize-typescript';

@Table
export class Tenant extends Model<Tenant> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  company: string;

  @Column
  is_admin: string;

  @Column
  site: string;

  @Column
  fallback_subdomain: string;

  @CreatedAt
  readonly created_at: Date;

  @UpdatedAt
  readonly updated_at: Date;
}
