import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma, User } from '../generated/client';
import { PrismaClientValidationError } from '@prisma/client/runtime/client';


export type onUserReturnCreate = {
  status: number;
  msg: string;
  data: string | User;
};

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService){}

  async create(createUserDto: CreateUserDto): Promise<onUserReturnCreate> {
    try {
      const { email, hashedPassword } = createUserDto;
      const newUser: User = await this.database.user.create({
        data: { email, hashedPassword },
      });
      return { status: 200, msg: 'User created successfully', data: newUser };
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        return {
          status: 401,
          msg: 'Something went wrong',
          data: 'Error... ALL FIELDS ARE REQUIRED',
        };
      }
      else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException(
        'Sorry, there was an error processing the request.',
      );

    }
  }

  findAll() {
    return `This action returns all user`;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
