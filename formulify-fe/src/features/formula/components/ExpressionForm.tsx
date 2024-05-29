'use client';

import { Button, Chip, MultiSelect, TextInput, rem } from '@mantine/core';
import { Controller, SubmitHandler, set, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Expression, Parser } from '@/lib/models/expression';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export interface ExpressionFormProps {
  expression?: Expression;
  onSubmit: SubmitHandler<ExpressionFormData>;
}

export type ExpressionFormData = {
  name: string;
  formula: string;
  variables: string[];
};

const expressionFormData = yup
  .object({
    name: yup.string().required(),
    formula: yup.string().required(),
    variables: yup.array().of(yup.string().required()).required(),
  })
  .required();

const expressionToForm = (
  expression: Expression | undefined
): ExpressionFormData => ({
  name: expression?.name ?? '',
  formula: expression?.formula ?? '',
  variables: expression?.variables ?? [],
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

  useEffect(() => {
    reset(expressionToForm(expression));
  }, [expression, reset]);

  const validateVariableName = (name: string) => {
    return name.match(/^[a-zA-Z]+[a-zA-Z0-9]*$/i);
  };

  const handleVariableInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    const length = name.length;

    if (length === 0) return;

    if (!validateVariableName(name)) {
      if (
        name[name.length - 1] === ' ' &&
        validateVariableName(name.slice(0, length - 1))
      ) {
        setValue('variables', [
          ...getValues().variables,
          name.slice(0, length - 1),
        ]);
        e.currentTarget.value = '';
      }
    }
  };

  const validateAndSubmit = (formData: ExpressionFormData) => {
    const parser = new Parser(formData.formula);

    const errorMessage = parser.validate([...formData.variables]);

    if (errorMessage != null) {
      notifications.show({
        title: 'Invalid formula',
        message: errorMessage,
        color: 'red',
      });
    }
    onSubmit(getValues());
  };

  return (
    <form onSubmit={handleSubmit(validateAndSubmit)} className="w-full">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput label="Name" placeholder="Name" {...field} required />
        )}
      />

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

      <TextInput
        label="Variables"
        placeholder="Variable"
        onChange={handleVariableInputChange}
      />

      <Controller
        name="variables"
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

      <Button type="submit" mt="sm">
        Save
      </Button>
    </form>
  );
}
