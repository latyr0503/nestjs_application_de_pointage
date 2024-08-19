import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revenu } from './revenu.entity';

@Injectable()
export class RevenuService {
  constructor(
    @InjectRepository(Revenu)
    private revenuRepository: Repository<Revenu>,
  ) {}

  findAll(): Promise<Revenu[]> {
    return this.revenuRepository.find();
  }

  findOne(id: number): Promise<Revenu> {
    return this.revenuRepository.findOneBy({ id });
  }

  create(book: Revenu): Promise<Revenu> {
    return this.revenuRepository.save(book);
  }

  async update(id: number, updateBookDto: Partial<Revenu>): Promise<Revenu> {
    await this.revenuRepository.update(id, updateBookDto);
    return this.revenuRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.revenuRepository.delete(id);
  }
}
