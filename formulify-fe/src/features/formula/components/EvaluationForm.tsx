'use client';

import { notifications } from '@mantine/notifications';
import { TextInput } from '@mantine/core';

import { Expression, Parser } from '@/lib/models/expression';
import { cacheKeys } from '@/api/api';
import { getExpression } from '@/api/expression.api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export interface EvaluationFormProps {
  expression: Expression;
}

export default function EvaluationForm({ expression }: EvaluationFormProps) {
  const [vars, setVars] = useState<number[]>(
    Array(expression.variables.length).fill(0)
  );

  const parser = new Parser(expression.formula);

  const evaluate = () => {
    const kv: { [key: string]: number } = {};
    expression?.variables.forEach((v: string, i) => {
      kv[v] = vars[i];
    });

    try {
      const result = parser.evaluate(kv);

      return result;
    } catch (e: any) {
      return e.message;
    }
  };

  const inputs = expression.variables.map((variable, i) => {
    return (
      <TextInput
        value={vars[i] ?? 0}
        onChange={(e) =>
          setVars((vars) => [
            ...vars.slice(0, i),
            parseFloat(e.target.value ?? '0'),
            ...vars.slice(i + 1),
          ])
        }
        key={variable}
        label={variable}
        placeholder={variable}
        type="number"
        required
      />
    );
  });

  return (
    <div className="flex flex-col gap-5 w-1/3">
      <h2 className="text-xl font-semibold">Evaluate {expression?.name}</h2>
      <div>{inputs}</div>

      <div>
        Result: <span className="text-green">{evaluate()}</span>
      </div>
    </div>
  );
}
