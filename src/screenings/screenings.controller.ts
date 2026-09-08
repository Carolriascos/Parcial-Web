import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { ScreeningsService } from './screenings.service';
import { UpdateScreeningDto } from './dto/update-screening.dto';

@Controller('screening')
export class ScreeningController {
  constructor(private readonly screeningService: ScreeningsService) {}

  @Post()
  create(@Body() createOrderDto: CreateScreeningDto) {
    return this.screeningService.create(CreateScreeningDto);
  }

  @Get()
  findAll() {
    return this.screeningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screeningService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateScreeningDto) {
    return this.screeningService.update(Number(id), updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screeningService.remove(Number(id));
  }
}