import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { ScreeningEntity } from './entities/order.entity';
import { ScreeningController } from './screenings.controller';
import { ScreeningService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, ScreeningEntity])],
  controllers: [ScreeningController],
  providers: [ScreeningService],
})
export class ScreeningModule {} 