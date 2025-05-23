import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'latyr@gmail.com',
  })
  @IsEmail({}, { message: 'Email invalide ou non renseigné' })
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    minLength: 6,
    example: 'Passer@123',
  })
  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  password: string;
}
