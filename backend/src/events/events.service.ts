import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma.service';
import { JoinEventDto } from './dto/join-event-dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...createEventDto,
        startDate: new Date(createEventDto.startDate),
        endDate: new Date(createEventDto.endDate),
      },
      include: {
        participants: {
          select: { id: true, firstname: true, lastname: true, email: true },
        },
      },
    });
  }

  async joinEvent(joinEventDto: JoinEventDto) {
    const event = await this.findOne(joinEventDto.eventId);

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: joinEventDto.userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.prisma.event.update({
      where: { id: joinEventDto.eventId },
      data: {
        participants: {
          connect: {
            id: joinEventDto.userId,
          },
        },
      },
      include: {
        participants: {
          select: { id: true, firstname: true, lastname: true, email: true },
        },
      },
    });
  }

  findAll() {
    return this.prisma.event.findMany({
      include: {
        participants: {
          select: { id: true, firstname: true, lastname: true, email: true },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        participants: {
          select: { id: true, firstname: true, lastname: true, email: true },
        },
      },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
      include: {
        participants: {
          select: { id: true, firstname: true, lastname: true, email: true },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
