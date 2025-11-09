import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateActivityDto, ActivityResponseDto, UpdateActivityDto } from '@saas-template/core';
import type { Activity } from '@saas-template/database';
import { ActivitysRepository } from './activities.repository';

@Injectable()
export class ActivitysService {
  constructor(
    private readonly activitysRepository: ActivitysRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ActivityResponseDto[]> {
    const activities = await this.activitysRepository.findAll(userId);
    return activities.map((activity: Activity) => this.toResponseDto(activity));
  }

  async findOne(id: string, userId: string): Promise<ActivityResponseDto> {
    const activity = await this.activitysRepository.findById(id, userId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    return this.toResponseDto(activity);
  }

  async create(userId: string, dto: CreateActivityDto): Promise<ActivityResponseDto> {
    return this.uow.execute(async () => {
      const activity = await this.activitysRepository.create(userId, dto);
      return this.toResponseDto(activity);
    });
  }

  async update(id: string, userId: string, dto: UpdateActivityDto): Promise<ActivityResponseDto> {
    return this.uow.execute(async () => {
      const activity = await this.activitysRepository.update(id, userId, dto);
      if (!activity) {
        throw new NotFoundException('Activity not found');
      }
      return this.toResponseDto(activity);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.activitysRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Activity not found');
      }
    });
  }

  private toResponseDto(activity: Activity): ActivityResponseDto {
    return {
      id: activity.id,
      user_id: activity.user_id,
      activity_type: activity.activity_type,
      duration: activity.duration,
      date: activity.date,
      createdAt: activity.createdAt,
      updatedAt: activity.updatedAt,
    };
  }
}
