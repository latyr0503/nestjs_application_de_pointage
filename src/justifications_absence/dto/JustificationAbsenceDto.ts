import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateJustificationDto {
  @ApiProperty({
    description: "ID de l'utilisateur concerné",
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: "Motif de l'absence",
    example: 'Maladie',
  })
  @IsString()
  @IsNotEmpty()
  motif: string;

  @ApiProperty({
    description: 'Date de la justification (format ISO)',
    example: '2025-05-19',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: string; // Changé de Date à string pour l'API
}

export class UpdateJustificationDto extends PartialType(
  CreateJustificationDto,
) {
  @ApiProperty({
    description: "ID de l'utilisateur concerné",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({
    description: "Motif de l'absence",
    example: 'Maladie',
    required: false,
  })
  @IsOptional()
  @IsString()
  motif?: string;
}
