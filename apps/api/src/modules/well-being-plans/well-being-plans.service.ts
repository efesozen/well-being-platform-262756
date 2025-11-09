import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateWellbeingplanDto, WellbeingplanResponseDto, UpdateWellbeingplanDto } from '@saas-template/core';
import type { Wellbeingplan } from '@saas-template/database';
import { WellbeingplansRepository } from './wellbeingplans.repository';

@Injectable()
export class WellbeingplansService {
  constructor(
    private readonly wellbeingplansRepository: WellbeingplansRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<WellbeingplanResponseDto[]> {
    const wellbeingplans = await this.wellbeingplansRepository.findAll(userId);
    return wellbeingplans.map((wellbeingplan: Wellbeingplan) => this.toResponseDto(wellbeingplan));
  }

  async findOne(id: string, userId: string): Promise<WellbeingplanResponseDto> {
    const wellbeingplan = await this.wellbeingplansRepository.findById(id, userId);
    if (!wellbeingplan) {
      throw new NotFoundException('Wellbeingplan not found');
    }
    return this.toResponseDto(wellbeingplan);
  }

  async create(userId: string, dto: CreateWellbeingplanDto): Promise<WellbeingplanResponseDto> {
    return this.uow.execute(async () => {
      const wellbeingplan = await this.wellbeingplansRepository.create(userId, dto);
      return this.toResponseDto(wellbeingplan);
    });
  }

  async update(id: string, userId: string, dto: UpdateWellbeingplanDto): Promise<WellbeingplanResponseDto> {
    return this.uow.execute(async () => {
      const wellbeingplan = await this.wellbeingplansRepository.update(id, userId, dto);
      if (!wellbeingplan) {
        throw new NotFoundException('Wellbeingplan not found');
      }
      return this.toResponseDto(wellbeingplan);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.wellbeingplansRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Wellbeingplan not found');
      }
    });
  }

  private toResponseDto(wellbeingplan: Wellbeingplan): WellbeingplanResponseDto {
    return {
      id: wellbeingplan.id,
      user_id: wellbeingplan.user_id,
      plan_details: wellbeingplan.plan_details,
      createdAt: wellbeingplan.createdAt,
      updatedAt: wellbeingplan.updatedAt,
    };
  }
}
