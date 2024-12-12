import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OrderService } from './services';

@Controller()
export class AppController {
  constructor(private orderService: OrderService) {}
  @EventPattern('dump-order')
  async handleUserCreated(id: string) {
    console.log('🚀 ~ AppController ~ handleUserCreated ~ data:', id);
    // generate sample order data
    await this.orderService.createOrder({
      name: 'Order 1',
      price: 100,
      userId: id,
    });
  }

  @MessagePattern({ cmd: 'order-list' })
  handleOrderList(data: { userId: string }) {
    console.log('🚀 ~ AppController ~ handleOrderList ~ data:', data);

    return this.orderService.getOrderList(data.userId);
  }
}
