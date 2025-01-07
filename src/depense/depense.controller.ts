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
import { Logger } from '@nestjs/common';
import { Depense } from './depense.entity';

@Controller('depense')
export class DepenseController {
  private readonly logger = new Logger(DepenseController.name);

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
  async create(@Body() createDepenseDto: Depense): Promise<Depense> {
    this.logger.log('Creating a new expense...');
    const createdDepense = await this.DepenseService.create(createDepenseDto);
    this.logger.log(`Expense created with ID: ${createdDepense.id}`);
    return createdDepense;
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
