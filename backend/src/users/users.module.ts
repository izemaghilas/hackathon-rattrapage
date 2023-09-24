import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { TeamsService } from 'src/teams/teams.service';

@Module({
  imports: [PassportModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, TeamsService],
  exports: [UsersService],
})
export class UsersModule {}
