import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Activity } from '@saas-template/database';
import type { CreateActivityDto, UpdateActivityDto } from '@saas-template/core';

@Injectable()
export class ActivitysRepository extends Repository<Activity> {
  constructor(private dataSource: DataSource) {
    super(Activity, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Activity[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Activity | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateActivityDto): Promise<Activity> {
    const activity = this.create({
      ...dto,
      userId,
    });
    return this.save(activity);
  }

  async update(id: string, userId: string, dto: UpdateActivityDto): Promise<Activity | null> {
    const activity = await this.findById(id, userId);
    if (!activity) {
      return null;
    }

    Object.assign(activity, dto);
    return this.save(activity);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const activity = await this.findById(id, userId);
    if (!activity) {
      return false;
    }

    await this.softRemove(activity);
    return true;
  }
}
