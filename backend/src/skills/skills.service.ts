import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SkillType, Skill } from '@prisma/client';
//import { EnumType } from 'typescript';
import { CreateSkillDto } from './skillsDto/skills.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSkills(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  async getSkillById(id: string): Promise<Skill | null> {
    return this.prisma.skill.findUnique({
      where: { id },
    });
  }

  async getSkillByType(skillType: SkillType): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: { type: skillType },
    });
  }

  async createSkill(skill: CreateSkillDto): Promise<Skill> {
    return this.prisma.skill.create({
      data: skill,
    });
  }

  async updateSkill(id: string, skill: Skill): Promise<Skill | null> {
    return this.prisma.skill.update({
      where: { id },
      data: skill,
    });
  }

  async deleteSkill(id: string): Promise<void> {
    await this.prisma.skill.delete({
      where: { id },
    });
  }
}
