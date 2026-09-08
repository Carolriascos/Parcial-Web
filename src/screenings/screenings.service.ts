import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { RoomEntity } from '../rooms/entities/room.entity';
import { ScreeningEntity } from './entities/screening.entity';
import { UpdateScreeningDto } from './dto/update-screening.dto';

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(ScreeningEntity)
    private readonly screeningRepository: Repository<ScreeningEntity>,

    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
  ) {}

  async create(createScreeningDto: CreateScreeningDto): Promise<ScreeningEntity> {
    const rooms = await this.roomsRepository.findOneBy({
      id: createScreeningDto.roomsId,
    });

    if (!rooms) {
      throw new NotFoundException(
        `Rooms with id ${createScreeningDto.roomsId} was not found`,
      );
    }

    const screening = this.screeningRepository.create({
      item: createScreeningDto.item,
      quantity: createScreeningDto.quantity,
      status: 'pending',
      rooms,
    });

    return this.screeningRepository.save(screening);
  }

  async findAll(): Promise<ScreeningEntity[]> {
    return this.screeningRepository.find({
      relations: {
        rooms: true,
      },
      screening: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<ScreeningEntity> {
    const screening = await this.screeningRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!screening) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return screening;
  }

  async update(
    id: number,
    UpdateScreeningDto: UpdateScreeningDto,
  ): Promise<ScreeningEntity> {
    const screening = await this.findOne(id);

    this.screeningRepository.merge(screening, UpdateScreeningDto);

    return this.screeningRepository.save(screening);
  }

  async remove(id: number): Promise<ScreeningEntity> {
    const screening = await this.findOne(id);

    return this.screeningRepository.remove(screening);
  }
}