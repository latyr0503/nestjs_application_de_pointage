import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Justifications_absence } from './justifications_absence.entity';
import {
  CreateJustificationDto,
  UpdateJustificationDto,
} from './dto/JustificationAbsenceDto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class JustificationsAbsenceService {
  constructor(
    @InjectRepository(Justifications_absence)
    private justifications_absenceRepository: Repository<Justifications_absence>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Justifications_absence[]> {
    return this.justifications_absenceRepository.find({
      relations: ['user'], // Pour charger les données de l'utilisateur
    });
  }

  findOne(id: number): Promise<Justifications_absence> {
    return this.justifications_absenceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(
    createDto: CreateJustificationDto,
  ): Promise<Justifications_absence> {
    // Récupérer l'utilisateur
    const user = await this.userRepository.findOne({
      where: { id: createDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${createDto.userId} non trouvé`,
      );
    }

    // Créer l'entité à partir du DTO
    const justification = this.justifications_absenceRepository.create({
      motif: createDto.motif,
      date: createDto.date ? new Date(createDto.date) : new Date(),
      user: user,
    });

    return this.justifications_absenceRepository.save(justification);
  }

  async update(
    id: number,
    updateDto: UpdateJustificationDto,
  ): Promise<Justifications_absence> {
    // Si userId est fourni, récupérer l'utilisateur
    let user = null;
    if (updateDto.userId) {
      user = await this.userRepository.findOne({
        where: { id: updateDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          `Utilisateur avec l'ID ${updateDto.userId} non trouvé`,
        );
      }
    }

    // Préparer les données de mise à jour
    const updateData: any = {};
    if (updateDto.motif) updateData.motif = updateDto.motif;
    if (updateDto.date) updateData.date = new Date(updateDto.date);
    if (user) updateData.user = user;

    await this.justifications_absenceRepository.update(id, updateData);
    return this.justifications_absenceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.justifications_absenceRepository.delete(id);
  }
}
