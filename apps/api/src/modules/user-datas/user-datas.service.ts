import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateUserdataDto, UserdataResponseDto, UpdateUserdataDto } from '@saas-template/core';
import type { Userdata } from '@saas-template/database';
import { UserdatasRepository } from './userdatas.repository';

@Injectable()
export class UserdatasService {
  constructor(
    private readonly userdatasRepository: UserdatasRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<UserdataResponseDto[]> {
    const userdatas = await this.userdatasRepository.findAll(userId);
    return userdatas.map((userdata: Userdata) => this.toResponseDto(userdata));
  }

  async findOne(id: string, userId: string): Promise<UserdataResponseDto> {
    const userdata = await this.userdatasRepository.findById(id, userId);
    if (!userdata) {
      throw new NotFoundException('Userdata not found');
    }
    return this.toResponseDto(userdata);
  }

  async create(userId: string, dto: CreateUserdataDto): Promise<UserdataResponseDto> {
    return this.uow.execute(async () => {
      const userdata = await this.userdatasRepository.create(userId, dto);
      return this.toResponseDto(userdata);
    });
  }

  async update(id: string, userId: string, dto: UpdateUserdataDto): Promise<UserdataResponseDto> {
    return this.uow.execute(async () => {
      const userdata = await this.userdatasRepository.update(id, userId, dto);
      if (!userdata) {
        throw new NotFoundException('Userdata not found');
      }
      return this.toResponseDto(userdata);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.userdatasRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Userdata not found');
      }
    });
  }

  private toResponseDto(userdata: Userdata): UserdataResponseDto {
    return {
      id: userdata.id,
      user_id: userdata.user_id,
      goal_setting: userdata.goal_setting,
      progress_tracking: userdata.progress_tracking,
      createdAt: userdata.createdAt,
      updatedAt: userdata.updatedAt,
    };
  }
}
