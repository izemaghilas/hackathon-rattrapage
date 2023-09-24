import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkillType, Skill } from '@prisma/client';
import { RolesGuard } from 'src/roles.guard';
import { CreateSkillDto } from './skillsDto/skills.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async getAllSkills(): Promise<Skill[]> {
    return this.skillsService.getAllSkills();
  }

  @Get(':id')
  async getSkillById(@Param('id') id: string): Promise<Skill | null> {
    return this.skillsService.getSkillById(id);
  }

  @Get()
  async getSkillByType(@Param('type') type: SkillType): Promise<Skill[]> {
    return this.skillsService.getSkillByType(type);
  }

  @Post()
  async createSkill(
    @Body(ValidationPipe) skill: CreateSkillDto,
  ): Promise<Skill> {
    return this.skillsService.createSkill(skill);
  }

  @Put(':id')
  async updateSkill(
    @Param('id') id: string,
    @Body() skill: Skill,
  ): Promise<Skill | null> {
    return this.skillsService.updateSkill(id, skill);
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: string): Promise<void> {
    await this.skillsService.deleteSkill(id);
  }
}
