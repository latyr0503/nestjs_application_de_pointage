import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DepenseService } from './depense.service';
import { Depense } from './depense.entity';

@Controller('depense')
export class DepenseController {
  constructor(private readonly DepenseService: DepenseService) {}

  @Get()
  findAll(): Promise<Depense[]> {
    return this.DepenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Depense> {
    return this.DepenseService.findOne(id);
  }

  @Post()
  create(@Body() createDepenseDto: Depense): Promise<Depense> {
    return this.DepenseService.create(createDepenseDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDepenseDto: Partial<Depense>,
  ): Promise<Depense> {
    return this.DepenseService.update(id, updateDepenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.DepenseService.remove(id);
  }
}
