import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Depense } from './depense.entity';

@Injectable()
export class DepenseService {
  constructor(
    @InjectRepository(Depense)
    private depenseRepository: Repository<Depense>,
  ) {}

  findAll(): Promise<Depense[]> {
    return this.depenseRepository.find();
  }

  findOne(id: number): Promise<Depense> {
    return this.depenseRepository.findOneBy({ id });
  }

  create(depense: Depense): Promise<Depense> {
    return this.depenseRepository.save(depense);
  }

  async update(
    id: number,
    updateDepenseDto: Partial<Depense>,
  ): Promise<Depense> {
    await this.depenseRepository.update(id, updateDepenseDto);
    return this.depenseRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.depenseRepository.delete(id);
  }
}
