import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsEntity } from './entities/room.entity';
import {RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomsEntity])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}