import type { CreateWellbeingplanDto, UpdateWellbeingplanDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wellbeingplansService } from '../services';

const WELLBEINGPLAN_KEY = ['wellbeingplans'];

export function useWellbeingplans() {
  return useQuery({
    queryKey: WELLBEINGPLAN_KEY,
    queryFn: () => wellbeingplansService.getAll(),
  });
}

export function useWellbeingplan(id: string) {
  return useQuery({
    queryKey: [...WELLBEINGPLAN_KEY, id],
    queryFn: () => wellbeingplansService.getById(id),
    enabled: !!id,
  });
}

export function useCreateWellbeingplan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWellbeingplanDto) => wellbeingplansService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLBEINGPLAN_KEY });
    },
  });
}

export function useUpdateWellbeingplan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWellbeingplanDto }) =>
      wellbeingplansService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLBEINGPLAN_KEY });
    },
  });
}

export function useDeleteWellbeingplan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => wellbeingplansService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WELLBEINGPLAN_KEY });
    },
  });
}
