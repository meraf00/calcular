'use client';

import React from 'react';
import ExpressionForm, { ExpressionFormData } from './ExpressionForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpression } from '@/api/expression.api';
import { cacheKeys } from '@/api/api';
import { notifications } from '@mantine/notifications';

export default function CreateExpressionWrapper() {
  const queryClient = useQueryClient();

  const createHandler = useMutation({
    mutationFn: createExpression,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cacheKeys.expressions] });
      notifications.show({
        title: 'Success',
        message: 'Formula added successfully',
        color: 'blue',
      });
    },
  });

  const handleCreate = (data: ExpressionFormData) => {
    createHandler.mutate(data);
  };

  return (
    <div className="flex w-1/3 p-5">
      <ExpressionForm onSubmit={handleCreate} />
    </div>
  );
}
