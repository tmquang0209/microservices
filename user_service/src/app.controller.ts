import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SignupDTO } from './dtos/auth/signup.dto';
import { Users } from './entities';
import { UserService } from './services';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'get-info' })
  handlerGetInfo(data: { id: string }): Promise<Users> {
    console.log('User service received data', data.id);
    return this.userService.handlerGetInfo(data.id);
  }

  @MessagePattern({ cmd: 'signup' })
  async handlerSignUp(data: SignupDTO): Promise<Users> {
    console.log('User service received data', data);

    const user = await this.userService.handlerSignUp(data);

    return user;
  }
}
