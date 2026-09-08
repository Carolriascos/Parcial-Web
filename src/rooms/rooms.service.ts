import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,

  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    const room = await this.roomsRepository.findOneBy({
      id: createRoomDto.roomsId,
    });

    if (!room) {
      throw new NotFoundException(
        `Customer with id ${createRoomDto.roomsId} was not found`,
      );
    }

    const room = this.roomsRepository.create({
      item: createRoomDto.item,
      quantity: createRoomDto.quantity,
      status: 'pending',
      rooms,
    });

    return this.roomsRepository.save(room);
  }

  async findAll(): Promise<RoomEntity[]> {
    return this.roomsRepository.find({
      relations: {
        rooms: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<RoomEntity> {
    const order = await this.roomsRepository.findOne({
      where: { id },
      relations: {
        rooms: true,
      },
    });

    if (!rooms) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }


  async remove(id: number): Promise<RoomEntity> {
    const order = await this.findOne(id);

    return this.roomsRepository.remove(rooms);
  }
}