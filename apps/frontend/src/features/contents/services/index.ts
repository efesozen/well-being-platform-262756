import { api } from '@/lib/api';
import type { ContentResponseDto, CreateContentDto, UpdateContentDto } from '@saas-template/core';

export const contentsService = {
  async getAll(): Promise<ContentResponseDto[]> {
    const response = await api.get('/contents');
    return response.data;
  },

  async getById(id: string): Promise<ContentResponseDto> {
    const response = await api.get(`/contents/${id}`);
    return response.data;
  },

  async create(data: CreateContentDto): Promise<ContentResponseDto> {
    const response = await api.post('/contents', data);
    return response.data;
  },

  async update(id: string, data: UpdateContentDto): Promise<ContentResponseDto> {
    const response = await api.put(`/contents/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/contents/${id}`);
  },
};
