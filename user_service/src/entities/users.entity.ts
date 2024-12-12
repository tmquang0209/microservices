import * as bcrypt from 'bcrypt';
import { BeforeCreate, Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from 'src/common/configs';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class Users extends BaseEntity<Users> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @BeforeCreate
  static async hashPassword(instance: Users) {
    instance.password = await bcrypt.hash(instance.password, 10);
  }
}
