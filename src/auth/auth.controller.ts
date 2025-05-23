import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User, UserRole } from './user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Inscription d’un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur inscrit avec succès.' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé.' })
  async signUp(@Body() body: SignUpDto) {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      gender,
      role,
    } = body;

    await this.authService.signUp(
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
      gender,
      role as UserRole,
    );

    return { message: 'Utilisateur inscrit avec succès' };
  }

  @ApiOperation({ summary: 'Tout les utilisateurs' })
  @ApiResponse({
    status: 201,
    description: 'Recupération de tout les utlisateurs avec succès.',
  })
  @ApiResponse({
    status: 409,
    description: 'Recupération des utilisateurs a échoués',
  })
  @Get()
  findAll(): Promise<Omit<User, 'password'>[]> {
    return this.authService.findAll();
  }

  @ApiOperation({ summary: 'Un seul utilisateur' })
  @ApiResponse({
    status: 201,
    description: "Recupération de l'utilisateur a reussi avec succès.",
  })
  @ApiResponse({
    status: 409,
    description: "Recupération de l'utilisateur a échoués",
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Partial<User>> {
    return this.authService.findOne(id);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ status: 200, description: 'Connexion réussie.' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides.' })
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }
}
