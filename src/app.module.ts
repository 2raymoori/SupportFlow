import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import 'dotenv/config';
import { RoleModule } from './role/role.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [DatabaseModule, RoleModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}