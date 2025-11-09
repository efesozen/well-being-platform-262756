import type { CreateUserdataDto, UpdateUserdataDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userdatasService } from '../services';

const USERDATA_KEY = ['userdatas'];

export function useUserdatas() {
  return useQuery({
    queryKey: USERDATA_KEY,
    queryFn: () => userdatasService.getAll(),
  });
}

export function useUserdata(id: string) {
  return useQuery({
    queryKey: [...USERDATA_KEY, id],
    queryFn: () => userdatasService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUserdata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserdataDto) => userdatasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERDATA_KEY });
    },
  });
}

export function useUpdateUserdata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserdataDto }) =>
      userdatasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERDATA_KEY });
    },
  });
}

export function useDeleteUserdata() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userdatasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERDATA_KEY });
    },
  });
}
