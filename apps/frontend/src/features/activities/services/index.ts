import { api } from '@/lib/api';
import type { ActivityResponseDto, CreateActivityDto, UpdateActivityDto } from '@saas-template/core';

export const activitiesService = {
  async getAll(): Promise<ActivityResponseDto[]> {
    const response = await api.get('/activities');
    return response.data;
  },

  async getById(id: string): Promise<ActivityResponseDto> {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  },

  async create(data: CreateActivityDto): Promise<ActivityResponseDto> {
    const response = await api.post('/activities', data);
    return response.data;
  },

  async update(id: string, data: UpdateActivityDto): Promise<ActivityResponseDto> {
    const response = await api.put(`/activities/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/activities/${id}`);
  },
};
