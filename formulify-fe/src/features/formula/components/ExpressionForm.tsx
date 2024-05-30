'use client';

import { notifications } from '@mantine/notifications';
import { Button, MultiSelect, TextInput } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Expression, Parser } from '@/lib/models/expression';
import { MultiSelectInput } from '@/components/MultiSelectInput';
import { ExpressionBuilder } from './ExpressionBuilder';
import { useQuery } from '@tanstack/react-query';
import { cacheKeys } from '@/api/api';
import { getExpressions } from '@/api/expression.api';

export interface ExpressionFormProps {
  expression?: Expression;
  onSubmit: SubmitHandler<ExpressionFormData>;
}

export type ExpressionFormData = {
  name: string;
  formula: string;
  dependencies: string[];
};

const expressionFormData = yup
  .object({
    name: yup.string().required(),
    formula: yup.string().required(),
    dependencies: yup.array().of(yup.string().required()).required(),
  })
  .required();

const expressionToForm = (
  expression: Expression | undefined
): ExpressionFormData => ({
  name: expression?.name ?? '',
  formula: expression?.formula ?? '',
  dependencies: expression?.dependencies.map((dep) => dep.name) ?? [],
});

export default function ExpressionForm({
  expression,
  onSubmit,
}: ExpressionFormProps) {
  const {
    control,
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpressionFormData>({
    resolver: yupResolver(expressionFormData),
    defaultValues: useMemo(() => expressionToForm(expression), [expression]),
  });

  const { data: expressions } = useQuery({
    queryKey: [cacheKeys.expressions],
    queryFn: getExpressions,
  });

  useEffect(() => {
    reset(expressionToForm(expression));
  }, [expression, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {expressions && <ExpressionBuilder expressions={expressions} />}

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput label="Name" placeholder="Name" {...field} required />
        )}
      />

      <Controller
        name="dependencies"
        control={control}
        render={({ field }) => (
          <MultiSelect
            variant="unstyled"
            style={{
              color: 'transparent',
            }}
            {...field}
            clearable
          />
        )}
      ></Controller>

      <Controller
        name="formula"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Formula"
            placeholder="Formula"
            {...field}
            required
          />
        )}
      />

      <Button type="submit" mt="sm">
        Add formula
      </Button>
    </form>
  );
}
