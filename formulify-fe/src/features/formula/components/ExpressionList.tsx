'use client';

import React from 'react';
import { LoadingOverlay, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getExpressions } from '@/api/expression.api';
import { cacheKeys } from '@/api/api';
import { Expression } from '@/lib/models/expression';
import { IconEdit } from '@tabler/icons-react';
import Link from 'next/link';

export default function ExpressionList() {
  const { data: expressions, isLoading } = useQuery<Expression[]>({
    queryKey: [cacheKeys.formulas],
    queryFn: getExpressions,
  });

  const rows = expressions?.map((exp) => (
    <Table.Tr key={exp.id}>
      <Table.Td>
        <Link href={`expressions/${exp.id}`} className="text-blue-400">
          {exp.name}
        </Link>
      </Table.Td>
      <Table.Td>{exp.formula}</Table.Td>
      {/* <Table.Td>{exp.dependencies.map((d) => d.name).join(', ')}</Table.Td> */}
      {/* <Table.Td>
        <Link href="">
          <IconEdit />
        </Link>
      </Table.Td> */}
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
            <Table.Th>Variables</Table.Th>
            {/* <Table.Th></Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
