import { Inject, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { SignupDTO } from 'src/dtos/auth/signup.dto';
import { Users } from 'src/entities';

export class UserService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly client: ClientProxy,
    @InjectModel(Users) private userModel: typeof Users,
  ) {}

  async handlerGetInfo(id: string): Promise<Users> {
    const users = await this.userModel.findByPk(id);
    if (!users) throw new NotFoundException('User not found');

    return users;
  }

  async handlerSignUp(data: SignupDTO): Promise<Users> {
    const user = await this.userModel.create(data);

    this.client.emit('dump-order', user.id);

    return user;
  }
}
