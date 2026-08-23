import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { read } from 'fs';
import { DatabaseService } from '../database/database.service';
import { Organization, Prisma, Role } from '../generated/client';

export type onOrganizationReturnCreate = {
  status: number;
  msg: string;
  data: Organization | string;
};

@Injectable()
export class OrganizationService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<onOrganizationReturnCreate> {
    try {
      const newOrganization = await this.database.organization.create({
        data: { organizationName: createOrganizationDto.organizationName },
      });
      return {
        status: 200,
        msg: 'Organization Successfully Added',
        data: newOrganization,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Organization already exists');
      }
      throw new InternalServerErrorException(
        'Sorry, there was an error processing the request.',
      );
    }
  }

  async findAll(): Promise<Organization[]> {
    return this.database.organization.findMany();
  }

  async findOne(id: number): Promise<Organization | null> {
    return this.database.organization.findFirst({ where: { id } });
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
