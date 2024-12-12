import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/configs/base.entity';

@Table({
  tableName: 'orders',
  timestamps: true,
  paranoid: true,
})
export class Orders extends BaseEntity<Orders> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userId: string;
}
