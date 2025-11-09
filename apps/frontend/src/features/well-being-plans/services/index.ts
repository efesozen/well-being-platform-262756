import { api } from '@/lib/api';
import type { WellbeingplanResponseDto, CreateWellbeingplanDto, UpdateWellbeingplanDto } from '@saas-template/core';

export const wellbeingplansService = {
  async getAll(): Promise<WellbeingplanResponseDto[]> {
    const response = await api.get('/wellbeingplans');
    return response.data;
  },

  async getById(id: string): Promise<WellbeingplanResponseDto> {
    const response = await api.get(`/wellbeingplans/${id}`);
    return response.data;
  },

  async create(data: CreateWellbeingplanDto): Promise<WellbeingplanResponseDto> {
    const response = await api.post('/wellbeingplans', data);
    return response.data;
  },

  async update(id: string, data: UpdateWellbeingplanDto): Promise<WellbeingplanResponseDto> {
    const response = await api.put(`/wellbeingplans/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/wellbeingplans/${id}`);
  },
};
