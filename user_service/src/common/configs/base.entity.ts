import {
  AfterUpdate,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  underscored: true,
})
export abstract class BaseEntity<T> extends Model<T> {
  @PrimaryKey
  @Column({
    type: 'uuid',
    defaultValue: () => uuidv4(), // Set default UUID value here
  })
  declare id: string;

  @Column({
    type: 'timestamp',
    defaultValue: () => new Date(), // Set default value for creation timestamp
  })
  declare createdAt: Date;

  @Column({
    type: 'timestamp',
    defaultValue: () => new Date(), // Set default value for update timestamp
  })
  declare updatedAt: Date;

  @Column({
    type: 'timestamp',
    allowNull: true,
  })
  declare deletedAt: Date;

  @AfterUpdate
  static updateTimestamp(instance: BaseEntity<any>) {
    instance.updatedAt = new Date(); // Ensure `updated_at` is set on updates
  }
}
