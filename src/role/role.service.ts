import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';


import { DatabaseService } from '../database/database.service';
import { RoleCreateInput } from '../generated/models/Role';
import { Role } from '../generated/client';

@Injectable()
export class RoleService {
  constructor(
    private database: DatabaseService
  ) {}

  async create(role: RoleCreateInput):Promise<Role> {
    console.log(role);
    const newRole = await this.database.role.create({
      data: role,
    });
    console.log(newRole);
    return newRole; // 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
