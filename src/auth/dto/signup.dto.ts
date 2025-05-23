import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class SignUpDto {
  @ApiProperty({ description: 'First name of the user', example: 'latyr' })
  @IsString()
  @IsNotEmpty({ message: 'Le prénom est requis' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'sene' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est requis' })
  lastName: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+221771234567',
  })
  @IsNotEmpty({ message: 'Le numéro de téléphone est requis' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Email of the user', example: 'latyr@gmail.com' })
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 6,
    example: 'Passer@123',
  })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit avoir au moins 6 caractères' })
  password: string;

  @ApiProperty({
    description: 'Confirm password of the user',
    minLength: 6,
    example: 'Passer@123',
  })
  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @ApiProperty({ description: 'Gender of the user', example: 'Male' })
  @IsString()
  @IsNotEmpty({ message: 'Le genre est requis' })
  gender: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsEnum(UserRole, { message: 'Rôle invalide' })
  role: UserRole;
}
