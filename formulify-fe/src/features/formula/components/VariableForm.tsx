'use client';

import { notifications } from '@mantine/notifications';
import { Button, MultiSelect, TextInput } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Variable } from '@/lib/models/variable';

export interface VariableFormProps {
  variable?: Variable;
  onSubmit: SubmitHandler<VariableFormData>;
}

export type VariableFormData = {
  name: string;
  description: string;
};

const variableFormData = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const variableToForm = (variable: Variable | undefined): VariableFormData => ({
  name: variable?.name ?? '',
  description: variable?.description ?? '',
});

export default function VariableForm({
  variable,
  onSubmit,
}: VariableFormProps) {
  const {
    control,
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<VariableFormData>({
    resolver: yupResolver(variableFormData),
    defaultValues: useMemo(() => variableToForm(variable), [variable]),
  });

  useEffect(() => {
    reset(variableToForm(variable));
  }, [variable, reset]);

  const validateAndSubmit = (formData: VariableFormData) => {
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
        name="description"
        control={control}
        render={({ field }) => (
          <TextInput label="Name" placeholder="Name" {...field} required />
        )}
      />

      <Button type="submit" mt="sm">
        Add formula
      </Button>
    </form>
  );
}
