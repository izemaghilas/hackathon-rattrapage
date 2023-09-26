import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { UserRole } from 'src/users/userRole.enum';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingsService } from './trainings.service';
import { LoggedInUser } from 'src/loggedin-user.decorator';
import { User } from '@prisma/client';

@Controller('trainings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createTrainingDto: CreateTrainingDto) {
    return await this.trainingsService.create(createTrainingDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return await this.trainingsService.findAll();
  }

  @Get('users/current')
  async findByLoggedinUser(@LoggedInUser() user: User) {
    return await this.trainingsService.findByUserId(user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.trainingsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTrainingDto: UpdateTrainingDto,
  // ) {
  //   return this.trainingsService.update(+id, updateTrainingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.trainingsService.remove(+id);
  // }
}
