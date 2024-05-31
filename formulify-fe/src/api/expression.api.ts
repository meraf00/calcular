import { Expression } from '@/lib/models/expression';
import api from './api';

export interface CreateExpressionDto {
  name: string;
  formula: string;
  groupId: string;
}

export interface EvaluationDto {
  formulaId: string;
  variables: Record<string, number>;
}

export const getExpression = async (id: string): Promise<Expression> => {
  const response = await api.get(`formulas/${id}`);

  return {
    ...response.data,
    formula: response.data.representation,
    dependencies: [],
  };
};

export const getExpressions = async () => {
  const response = await api.get('formulas');
  return response.data.map((exp: any) => {
    return {
      ...exp,
      formula: exp.representation,
      dependencies: exp.variables,
    };
  });
};

export const createExpression = async (dto: CreateExpressionDto) => {
  const response = await api.post('formulas', {
    name: dto.name,
    representation: dto.formula,
    groupId: dto.groupId,
  });
  return response.data;
};

export const updateExpression = async (
  id: string,
  name: string,
  formula: string
) => {
  const response = await api.patch(`formulas/${id}`, { name, formula });
  return response.data;
};

export const deleteExpression = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`formulas/${id}`);
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

export const evaluateExpression = async (dto: EvaluationDto) => {
  return (await api.post(`formulas/${dto.formulaId}/evaluated`, dto)).data;
};
