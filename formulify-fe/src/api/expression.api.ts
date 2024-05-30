import { Expression } from '@/lib/models/expression';
import api from './api';

export interface CreateExpressionDto {
  name: string;
  formula: string;
  dependencies: string[];
}

export const getExpression = async (id: string): Promise<Expression> => {
  const response = await api.get(`expression/${id}`);
  return {
    ...response.data,
    dependencies: response.data.dependencies.map((v: any) => v.name),
  };
};

export const getExpressions = async () => {
  const response = await api.get('expression');
  return response.data.map((exp: any) => {
    return {
      ...exp,
      dependencies: exp.variables,
    };
  });
};

export const createExpression = async (dto: CreateExpressionDto) => {
  const response = await api.post('expression', dto);
  return response.data;
};

export const updateExpression = async (
  id: string,
  name: string,
  formula: string
) => {
  const response = await api.patch(`expression/${id}`, { name, formula });
  return response.data;
};
