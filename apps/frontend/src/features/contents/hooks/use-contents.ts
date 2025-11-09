import type { CreateContentDto, UpdateContentDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contentsService } from '../services';

const CONTENT_KEY = ['contents'];

export function useContents() {
  return useQuery({
    queryKey: CONTENT_KEY,
    queryFn: () => contentsService.getAll(),
  });
}

export function useContent(id: string) {
  return useQuery({
    queryKey: [...CONTENT_KEY, id],
    queryFn: () => contentsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContentDto) => contentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEY });
    },
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContentDto }) =>
      contentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEY });
    },
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEY });
    },
  });
}
