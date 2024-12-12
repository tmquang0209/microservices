import { InjectModel } from '@nestjs/sequelize';
import { Orders } from 'src/entities';

export class OrderService {
  constructor(@InjectModel(Orders) private orderModel: typeof Orders) {}

  async createOrder(data: { name: string; price: number; userId: string }) {
    return this.orderModel.create(data);
  }

  async getOrderList(userId: string) {
    return this.orderModel.findAll({ where: { userId } });
  }
}
