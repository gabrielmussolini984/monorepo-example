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
} from 'sequelize-typescript';

@Table
export class Plan extends Model<Plan> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  name: string;

  @Column
  billing_cycle: string;

  @Column
  price: number;

  @Column
  remote_plan_id: string;

  @CreatedAt
  readonly created_at: Date;

  @UpdatedAt
  readonly updated_at: Date;
}
