import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import 'dotenv/config';
import { RoleModule } from './role/role.module';

const DATABASE_URL = process.env.DATABASE_URL;

@Module({
  imports: [DatabaseModule,RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}