import type { CreateActivityDto, UpdateActivityDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activitiesService } from '../services';

const ACTIVITY_KEY = ['activities'];

export function useActivities() {
  return useQuery({
    queryKey: ACTIVITY_KEY,
    queryFn: () => activitiesService.getAll(),
  });
}

export function useActivity(id: string) {
  return useQuery({
    queryKey: [...ACTIVITY_KEY, id],
    queryFn: () => activitiesService.getById(id),
    enabled: !!id,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateActivityDto) => activitiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_KEY });
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateActivityDto }) =>
      activitiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_KEY });
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => activitiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITY_KEY });
    },
  });
}
