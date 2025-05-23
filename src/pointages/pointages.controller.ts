import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PointagesService } from './pointages.service';
import { Pointage } from './pointages.entity';
import { CreatePointageDto, UpdatePointageDto } from './dto/PointageDTO';

@ApiTags('Pointages')
@Controller('pointages')
export class PointagesController {
  constructor(private readonly pointagesService: PointagesService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les pointages' })
  @ApiResponse({
    status: 200,
    description: 'Liste des pointages récupérée avec succès',
    type: [Pointage],
  })
  async findAll(): Promise<Pointage[]> {
    return this.pointagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un pointage par ID' })
  @ApiParam({
    name: 'id',
    description: 'ID du pointage',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Pointage trouvé avec succès',
    type: Pointage,
  })
  @ApiResponse({ status: 404, description: 'Pointage non trouvé' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Pointage> {
    const pointage = await this.pointagesService.findOne(id);
    if (!pointage) {
      throw new NotFoundException(`Pointage avec l'ID ${id} non trouvé`);
    }
    return pointage;
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau pointage' })
  @ApiResponse({
    status: 201,
    description: 'Pointage créé avec succès',
    type: Pointage,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async create(@Body() createDto: CreatePointageDto): Promise<Pointage> {
    return this.pointagesService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un pointage' })
  @ApiParam({
    name: 'id',
    description: 'ID du pointage',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Pointage mis à jour avec succès',
    type: Pointage,
  })
  @ApiResponse({ status: 404, description: 'Pointage non trouvé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePointageDto,
  ): Promise<Pointage> {
    return this.pointagesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un pointage' })
  @ApiParam({
    name: 'id',
    description: 'ID du pointage',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Pointage supprimé avec succès',
  })
  @ApiResponse({ status: 404, description: 'Pointage non trouvé' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.pointagesService.remove(id);
    return { message: 'Pointage supprimé avec succès' };
  }
}
