import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { onUserReturnCreate, UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../generated/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | onUserReturnCreate> {
    const newUser: onUserReturnCreate =
      await this.userService.create(createUserDto);
    if (newUser.status == 200) {
      return newUser.data as User;
    } else {
      return newUser;
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
