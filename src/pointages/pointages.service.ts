import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pointage } from './pointages.entity';
import { CreatePointageDto, UpdatePointageDto } from './dto/PointageDTO';
import { User } from 'src/auth/user.entity';

@Injectable()
export class PointagesService {
  constructor(
    @InjectRepository(Pointage)
    private pointagesRepository: Repository<Pointage>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Pointage[]> {
    return this.pointagesRepository.find({
      relations: ['user'],
    });
  }

  findOne(id: number): Promise<Pointage> {
    return this.pointagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(createDto: CreatePointageDto): Promise<Pointage> {
    const user = await this.userRepository.findOne({
      where: { id: createDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Utilisateur avec l'ID ${createDto.userId} non trouvé`,
      );
    }

    const pointage = this.pointagesRepository.create({
      date: new Date(createDto.date),
      heure_arrivee: createDto.heure_arrivee,
      heure_depart: createDto.heure_depart,
      statut: createDto.statut,
      user: user,
    });

    return this.pointagesRepository.save(pointage);
  }

  async update(id: number, updateDto: UpdatePointageDto): Promise<Pointage> {
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

    const updateData: any = {};
    if (updateDto.date) updateData.date = new Date(updateDto.date);
    if (updateDto.heure_arrivee)
      updateData.heure_arrivee = updateDto.heure_arrivee;
    if (updateDto.heure_depart)
      updateData.heure_depart = updateDto.heure_depart;
    if (updateDto.statut) updateData.statut = updateDto.statut;
    if (user) updateData.user = user;

    await this.pointagesRepository.update(id, updateData);
    return this.pointagesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.pointagesRepository.delete(id);
  }
}
