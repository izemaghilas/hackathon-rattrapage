import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from './jwt/jwt.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { EventsModule } from './events/events.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [UsersModule, AuthModule, JwtModule, SkillsModule, EventsModule, TeamsModule],
  // controllers: [AppController, AuthController],
  providers: [PrismaClient, JwtService, PrismaService, AuthService],
})
export class AppModule {}
