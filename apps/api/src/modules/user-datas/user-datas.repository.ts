import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Userdata } from '@saas-template/database';
import type { CreateUserdataDto, UpdateUserdataDto } from '@saas-template/core';

@Injectable()
export class UserdatasRepository extends Repository<Userdata> {
  constructor(private dataSource: DataSource) {
    super(Userdata, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Userdata[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Userdata | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateUserdataDto): Promise<Userdata> {
    const userdata = this.create({
      ...dto,
      userId,
    });
    return this.save(userdata);
  }

  async update(id: string, userId: string, dto: UpdateUserdataDto): Promise<Userdata | null> {
    const userdata = await this.findById(id, userId);
    if (!userdata) {
      return null;
    }

    Object.assign(userdata, dto);
    return this.save(userdata);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const userdata = await this.findById(id, userId);
    if (!userdata) {
      return false;
    }

    await this.softRemove(userdata);
    return true;
  }
}
