import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateContentDto, ContentResponseDto, UpdateContentDto } from '@saas-template/core';
import type { Content } from '@saas-template/database';
import { ContentsRepository } from './contents.repository';

@Injectable()
export class ContentsService {
  constructor(
    private readonly contentsRepository: ContentsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ContentResponseDto[]> {
    const contents = await this.contentsRepository.findAll(userId);
    return contents.map((content: Content) => this.toResponseDto(content));
  }

  async findOne(id: string, userId: string): Promise<ContentResponseDto> {
    const content = await this.contentsRepository.findById(id, userId);
    if (!content) {
      throw new NotFoundException('Content not found');
    }
    return this.toResponseDto(content);
  }

  async create(userId: string, dto: CreateContentDto): Promise<ContentResponseDto> {
    return this.uow.execute(async () => {
      const content = await this.contentsRepository.create(userId, dto);
      return this.toResponseDto(content);
    });
  }

  async update(id: string, userId: string, dto: UpdateContentDto): Promise<ContentResponseDto> {
    return this.uow.execute(async () => {
      const content = await this.contentsRepository.update(id, userId, dto);
      if (!content) {
        throw new NotFoundException('Content not found');
      }
      return this.toResponseDto(content);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.contentsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Content not found');
      }
    });
  }

  private toResponseDto(content: Content): ContentResponseDto {
    return {
      id: content.id,
      title: content.title,
      description: content.description,
      type: content.type,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt,
    };
  }
}
