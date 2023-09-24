import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { PrismaService } from 'src/prisma.service';
import { TeamsController } from './teams.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService, UsersService],
  exports: [TeamsService]
})
export class TeamsModule {}
