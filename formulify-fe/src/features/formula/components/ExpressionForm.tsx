'use client';

import { notifications } from '@mantine/notifications';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { Expression } from '@/lib/models/expression';
import { Expression as ParserExpression } from '@shared/parser';
import { ExpressionBuilder } from './ExpressionBuilder';
import { useQuery } from '@tanstack/react-query';
import { cacheKeys } from '@/api/api';
import { getExpressions } from '@/api/expression.api';
import { Parser } from '@/shared/parser';

export interface ExpressionFormProps {
  expression?: Expression;
  onSubmit: (data: ExpressionFormData) => void;
}

export type ExpressionFormData = {
  name: string;
  formula: string;
  dependencies: string[];
};

export default function ExpressionForm({
  expression,
  onSubmit,
}: ExpressionFormProps) {
  const { data: expressions } = useQuery<Expression[]>({
    queryKey: [cacheKeys.formulas],
    queryFn: getExpressions,
  });

  const [name, setName] = useState<string>('');
  const [formula, setFormula] = useState<string[]>([]);

  const validateAndSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (formula.length === 0) {
      return onSubmit({
        name: name,
        formula: name,
        dependencies: [],
      });
    }

    try {
      const formula_ = formula
        .map((f) => {
          if (['(', ')', '*', '-', '+'].includes(f) || Number(f)) {
            return f;
          }
          const name = expressions?.find((e) => e.id === f)?.name;
          if (name) return name;
          throw new Error(`${f} is not found`);
        })
        .join(' ');

      const map: Record<string, Expression> = {};

      expressions?.forEach((e) => {
        map[e.name] = e;
      });

      const newFormula = new ParserExpression(name, formula_);
      const parser = new Parser(newFormula, map);

      const error = parser.validate();

      if (error === null) {
        const deps = parser.getDependencies(newFormula).map((dep) => {
          const id = expressions?.find((e) => e.name === dep)?.id;
          if (id) return id;
          throw new Error(`Expression ${dep} is not found`);
        });

        onSubmit({
          name: name,
          formula: formula_,
          dependencies: deps,
        });
      } else {
        throw new Error(error);
      }
    } catch (e: any) {
      notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
      });
    }
  };

  return (
    <form onSubmit={validateAndSubmit} className="w-full flex flex-col gap-3">
      <TextInput
        label="Name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        required
      />

      {expressions && (
        <ExpressionBuilder
          expressions={expressions}
          value={formula}
          setValue={setFormula}
        />
      )}

      <Button type="submit" mt="sm">
        Add formula
      </Button>
    </form>
  );
}
