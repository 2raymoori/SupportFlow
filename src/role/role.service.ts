import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';

import { DatabaseService } from '../database/database.service';
import { RoleCreateInput } from '../generated/models/Role';
import { Prisma, Role } from '../generated/client';
import { CreateRoleDto } from './dto/create-role.dto';
export type onRoleReturnCreate = {
  status: number;
  msg: string;
  data: Role | string;
};
@Injectable()
export class RoleService {
  constructor(private database: DatabaseService) {}

  async create(role: CreateRoleDto): Promise<onRoleReturnCreate> {
    try {
      const newRole = await this.database.role.create({
        data: { roleName: role.roleName },
      });
      return {
        status: 200,
        msg: 'Role Successfully Added',
        data: newRole,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Role already exists');
      }
      throw new InternalServerErrorException(
        'Sorry, there was an error processing the request.',
      );
    }
    // 'This action adds a new role';
  }

  async findAll(): Promise<Role[]> {
    return this.database.role.findMany();
  }

  async findOne(id: number): Promise<Role| null> {
    const role: Role | null  = await this.database.role.findFirst({
      where: { id: id },
    });
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
