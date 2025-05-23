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
import { JustificationsAbsenceService } from './justifications_absence.service';
import { Justifications_absence } from './justifications_absence.entity';
import {
  CreateJustificationDto,
  UpdateJustificationDto,
} from './dto/JustificationAbsenceDto';

@ApiTags("Justifications d'absence")
@Controller('justifications-absence')
export class JustificationsAbsenceController {
  constructor(
    private readonly justificationsAbsenceService: JustificationsAbsenceService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les justifications' })
  @ApiResponse({
    status: 200,
    description: 'Liste des justifications récupérée avec succès',
    type: [Justifications_absence],
  })
  async findAll(): Promise<Justifications_absence[]> {
    return this.justificationsAbsenceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une justification par ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la justification',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Justification trouvée avec succès',
    type: Justifications_absence,
  })
  @ApiResponse({ status: 404, description: 'Justification non trouvée' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Justifications_absence> {
    const justification = await this.justificationsAbsenceService.findOne(id);
    if (!justification) {
      throw new NotFoundException(`Justification avec l'ID ${id} non trouvée`);
    }
    return justification;
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle justification' })
  @ApiResponse({
    status: 201,
    description: 'Justification créée avec succès',
    type: Justifications_absence,
  })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async create(
    @Body() createDto: CreateJustificationDto,
  ): Promise<Justifications_absence> {
    return this.justificationsAbsenceService.create(createDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une justification' })
  @ApiParam({
    name: 'id',
    description: 'ID de la justification',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Justification mise à jour avec succès',
    type: Justifications_absence,
  })
  @ApiResponse({ status: 404, description: 'Justification non trouvée' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateJustificationDto,
  ): Promise<Justifications_absence> {
    return this.justificationsAbsenceService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une justification' })
  @ApiParam({
    name: 'id',
    description: 'ID de la justification',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Justification supprimée avec succès',
  })
  @ApiResponse({ status: 404, description: 'Justification non trouvée' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.justificationsAbsenceService.remove(id);
    return { message: 'Justification supprimée avec succès' };
  }
}
