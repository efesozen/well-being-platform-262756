import { api } from '@/lib/api';
import type { UserdataResponseDto, CreateUserdataDto, UpdateUserdataDto } from '@saas-template/core';

export const userdatasService = {
  async getAll(): Promise<UserdataResponseDto[]> {
    const response = await api.get('/userdatas');
    return response.data;
  },

  async getById(id: string): Promise<UserdataResponseDto> {
    const response = await api.get(`/userdatas/${id}`);
    return response.data;
  },

  async create(data: CreateUserdataDto): Promise<UserdataResponseDto> {
    const response = await api.post('/userdatas', data);
    return response.data;
  },

  async update(id: string, data: UpdateUserdataDto): Promise<UserdataResponseDto> {
    const response = await api.put(`/userdatas/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/userdatas/${id}`);
  },
};
