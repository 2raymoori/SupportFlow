import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../generated/client';
import { CreateRoleDto } from './dto/create-role.dto';
import type { Response } from 'express';

type onRoleReturnCreate = {
  status: number;
  msg: string;
  data: Role | string;
};
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<onRoleReturnCreate> {
    const onRoleCreate = await this.roleService.create(createRoleDto);
    return onRoleCreate;
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const roleSearch: Role | null = await this.roleService.findOne(+id);
    if (roleSearch) {
      return res
        .status(200)
        .json({ msg: 'Successfully found',data: roleSearch });
    } else {
      return res
        .status(404)
        .json({ msg: 'Sorry, There is no such role with this id' });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
