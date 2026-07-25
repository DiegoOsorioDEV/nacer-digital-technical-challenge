import { Controller, Get, Param } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  getUser(@Param('username') username: string): Promise<UserResponseDto> {
    return this.userService.getUserByUsername(username);
  }
}
