import { Injectable, NotFoundException } from '@nestjs/common';
import { Teams, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './userDto/users.dto';
import * as bcrypt from 'bcrypt';
import { TeamsService } from 'src/teams/teams.service';
import { UpdateUserDto } from './userDto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private teamsService: TeamsService,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: data.role,
        firstname: data.firstname,
        lastname: data.lastname,
        jobTitle: data.jobTitle,
        team: undefined,
        skills: undefined,
      },
    });
    return userData;
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getUsers(query): Promise<User[]> {
    const { search = undefined, skill = undefined } = query;

    const users = await this.prisma.user.findMany({
      orderBy: {
        firstname: 'desc',
      },
      include: {
        team: true,
        skills: true,
      },
      where: {
        skills: skill
          ? {
              some: {
                name: {
                  equals: skill,
                  mode: 'insensitive',
                },
              },
            }
          : undefined,
        OR: [
          {
            firstname: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            lastname: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    return users;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<string> {
    await this.prisma.user.delete({
      where: { id },
    });
    return 'deleted';
  }

  async getTeam(id: string): Promise<Teams> {
    const currentUser = await this.findOne(id);
    if (!currentUser.teamId) {
      throw new NotFoundException('Team not found');
    }
    return this.teamsService.findOneById(currentUser.teamId);
  }
}
