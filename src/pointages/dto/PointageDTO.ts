import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsInt,
  IsEnum,
} from 'class-validator';
import { StatutPointage } from '../pointages.entity';

export class CreatePointageDto {
  @ApiProperty({
    description: "ID de l'utilisateur concerné",
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Date du pointage (format ISO)',
    example: '2024-03-19',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: "Heure d'arrivée (format HH:mm)",
    example: '09:00',
  })
  @IsString()
  @IsNotEmpty()
  heure_arrivee: string;

  @ApiProperty({
    description: 'Heure de départ (format HH:mm)',
    example: '17:00',
    required: false,
  })
  @IsOptional()
  @IsString()
  heure_depart?: string;

  @ApiProperty({
    description: 'Statut du pointage',
    enum: StatutPointage,
    example: StatutPointage.PRESENT,
  })
  @IsEnum(StatutPointage)
  @IsNotEmpty()
  statut: StatutPointage;
}

export class UpdatePointageDto extends PartialType(CreatePointageDto) {
  @ApiProperty({
    description: "ID de l'utilisateur concerné",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({
    description: 'Date du pointage (format ISO)',
    example: '2024-03-19',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({
    description: "Heure d'arrivée (format HH:mm)",
    example: '09:00',
    required: false,
  })
  @IsOptional()
  @IsString()
  heure_arrivee?: string;

  @ApiProperty({
    description: 'Heure de départ (format HH:mm)',
    example: '17:00',
    required: false,
  })
  @IsOptional()
  @IsString()
  heure_depart?: string;

  @ApiProperty({
    description: 'Statut du pointage',
    enum: StatutPointage,
    example: StatutPointage.PRESENT,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatutPointage)
  statut?: StatutPointage;
}
