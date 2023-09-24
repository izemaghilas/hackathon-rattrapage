import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './teamsDto/teams.dto';
import { Teams } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTeamDto): Promise<Teams> {
    const teamData = this.prisma.teams.create({
      data: {
        ...data,
        teamName: data.teamName
      },
    });
    return teamData;
  }

  async findOneByTeamName(teamName: string): Promise<Teams | null> {
    return this.prisma.teams.findUnique({
      where: {
        teamName,
      },
    });
  }

  async findOneById(id: string): Promise<Teams | null> {
    const team = await this.prisma.teams.findUnique({
      where: { id },
    });
    return team;
  }

  async getTeams(): Promise<Teams[]> {
    const teams = await this.prisma.teams.findMany();
    return teams;
  }

  async updateTeam(id: string, team: UpdateTeamDto): Promise<Teams | null> {
    const updatedTeam = await this.prisma.teams.update({
      where: { id },
      data: team,
    });
    return updatedTeam;
  }

  async deleteTeam(id: string): Promise<void> {
    await this.prisma.teams.delete({
      where: { id },
    });
  }
}
