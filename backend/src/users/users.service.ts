import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SkillType, Teams, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './userDto/users.dto';
import * as bcrypt from 'bcrypt';
import { TeamsService } from 'src/teams/teams.service';
import { UpdateUserDto } from './userDto/update-users.dto';
import { UpdatePasswordDto } from './userDto/update-password.dto';

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
        role: 'USER',
        firstname: data.firstname,
        lastname: data.lastname,
        jobTitle: data.jobTitle,
        team: undefined,
        skills: {
          createMany: {
            data: data.skills.map((skillName) => ({
              name: skillName,
              level: 0,
              type: SkillType.FRONT,
            })),
          },
        },
      },
    });

    return userData;
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        team: true,
        skills: true,
        Training: true,
        Event: true,
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

  async updatePassword(
    id: string,
    updateDto: UpdatePasswordDto,
  ): Promise<User | null> {
    const { oldPassword, newPassword } = updateDto;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new BadGatewayException('Password is not valid');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
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
