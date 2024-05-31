'use client';

import React from 'react';
import ExpressionForm, { ExpressionFormData } from './ExpressionForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpression } from '@/api/expression.api';
import { cacheKeys } from '@/api/api';
import { notifications } from '@mantine/notifications';

export default function CreateExpressionWrapper({
  groupId,
}: {
  groupId: string;
}) {
  const queryClient = useQueryClient();

  const createHandler = useMutation({
    mutationFn: createExpression,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cacheKeys.formulas] });
      notifications.show({
        title: 'Success',
        message: 'Formula added successfully',
        color: 'blue',
      });
    },
  });

  const handleCreate = (data: ExpressionFormData) => {
    createHandler.mutate({
      ...data,
      groupId,
    });
  };

  return (
    <div className="flex w-full p-5">
      <ExpressionForm onSubmit={handleCreate} />
    </div>
  );
}
