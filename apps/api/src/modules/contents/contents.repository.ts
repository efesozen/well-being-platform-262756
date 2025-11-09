import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Content } from '@saas-template/database';
import type { CreateContentDto, UpdateContentDto } from '@saas-template/core';

@Injectable()
export class ContentsRepository extends Repository<Content> {
  constructor(private dataSource: DataSource) {
    super(Content, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Content[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Content | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateContentDto): Promise<Content> {
    const content = this.create({
      ...dto,
      userId,
    });
    return this.save(content);
  }

  async update(id: string, userId: string, dto: UpdateContentDto): Promise<Content | null> {
    const content = await this.findById(id, userId);
    if (!content) {
      return null;
    }

    Object.assign(content, dto);
    return this.save(content);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const content = await this.findById(id, userId);
    if (!content) {
      return false;
    }

    await this.softRemove(content);
    return true;
  }
}
