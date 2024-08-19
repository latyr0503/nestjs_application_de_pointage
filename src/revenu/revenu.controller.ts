import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RevenuService } from './revenu.service';
import { Revenu } from './revenu.entity';

@Controller('revenu')
export class RevenuController {
  constructor(private readonly revenuService: RevenuService) {}

  @Get()
  findAll(): Promise<Revenu[]> {
    return this.revenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Revenu> {
    return this.revenuService.findOne(id);
  }

  @Post()
  create(@Body() createRevenuDto: Revenu): Promise<Revenu> {
    return this.revenuService.create(createRevenuDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateRevenuDto: Partial<Revenu>,
  ): Promise<Revenu> {
    return this.revenuService.update(id, updateRevenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.revenuService.remove(id);
  }
}
