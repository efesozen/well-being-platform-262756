import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Wellbeingplan } from '@saas-template/database';
import type { CreateWellbeingplanDto, UpdateWellbeingplanDto } from '@saas-template/core';

@Injectable()
export class WellbeingplansRepository extends Repository<Wellbeingplan> {
  constructor(private dataSource: DataSource) {
    super(Wellbeingplan, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Wellbeingplan[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Wellbeingplan | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateWellbeingplanDto): Promise<Wellbeingplan> {
    const wellbeingplan = this.create({
      ...dto,
      userId,
    });
    return this.save(wellbeingplan);
  }

  async update(id: string, userId: string, dto: UpdateWellbeingplanDto): Promise<Wellbeingplan | null> {
    const wellbeingplan = await this.findById(id, userId);
    if (!wellbeingplan) {
      return null;
    }

    Object.assign(wellbeingplan, dto);
    return this.save(wellbeingplan);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const wellbeingplan = await this.findById(id, userId);
    if (!wellbeingplan) {
      return false;
    }

    await this.softRemove(wellbeingplan);
    return true;
  }
}
