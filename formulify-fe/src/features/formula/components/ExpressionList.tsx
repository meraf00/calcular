'use client';

import React from 'react';
import { LoadingOverlay, Table } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteExpression, getExpressions } from '@/api/expression.api';
import { cacheKeys } from '@/api/api';
import { Expression } from '@/lib/models/expression';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';

export default function ExpressionList() {
  const { data: expressions, isLoading } = useQuery<Expression[]>({
    queryKey: [cacheKeys.formulas],
    queryFn: getExpressions,
  });

  const queryClient = useQueryClient();

  const deleteHandler = useMutation({
    mutationFn: deleteExpression,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cacheKeys.formulas] });
      notifications.show({
        title: 'Success',
        message: 'Formula deleted successfully.',
        color: 'blue',
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteHandler.mutate(id);
  };

  const rows = expressions?.map((exp) => (
    <Table.Tr key={exp.id}>
      <Table.Td>
        <Link href={`expressions/${exp.id}`} className="text-blue-400">
          {exp.name}
        </Link>
      </Table.Td>
      <Table.Td>{exp.formula}</Table.Td>
      <Table.Td>
        <div className="flex gap-3">
          <Link href={''}>
            <IconEdit
              className="text-blue-400 cursor-pointer"
              onClick={() => {}}
            >
              {exp.name}
            </IconEdit>
          </Link>
          <IconTrash
            className="text-red-400 cursor-pointer"
            onClick={() => handleDelete(exp.id)}
          >
            {exp.name}
          </IconTrash>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="relative w-full">
      <LoadingOverlay visible={isLoading} />
      <Table highlightOnHover striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Formula</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
