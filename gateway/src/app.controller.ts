import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { SignupDTO } from './dtos/auth/signup.dto';

@Controller()
export class AppController {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'user_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
  private readonly userServiceClient: ClientProxy;

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'order_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
  private readonly orderServiceClient: ClientProxy;

  onModuleInit() {
    this.userServiceClient.connect();
    this.orderServiceClient.connect();
  }

  @Get('orders')
  getOrders() {
    try {
      return this.orderServiceClient.send(
        { cmd: 'order-list' },
        {
          userId: 1,
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  @Post('/signup')
  signUp(@Body() data: SignupDTO) {
    try {
      return this.userServiceClient
        .send(
          { cmd: 'signup' },
          {
            ...data,
          },
        )
        .toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/users/:id')
  async getUserOrders(@Param('id') id: number) {
    try {
      // call both 2 services
      const user = this.userServiceClient
        .send(
          { cmd: 'get-info' },
          {
            id,
          },
        )
        .toPromise();

      const orders = this.orderServiceClient
        .send(
          { cmd: 'order-list' },
          {
            userId: id,
          },
        )
        .toPromise();

      const [userDetails, ordersList] = await Promise.all([user, orders]);

      return {
        userDetails,
        ordersList,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
