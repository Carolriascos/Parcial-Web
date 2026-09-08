import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './../rooms/entities/room.entity';
import { ScreeningEntity } from './entities/screening.entity';
import { ScreeningController } from './screenings.controller';
import { ScreeningService } from './screenings.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, ScreeningEntity])],
  controllers: [ScreeningController],
  providers: [ScreeningService],
})
export class ScreeningModule {} 