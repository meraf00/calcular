import { Expression } from '@/lib/models/expression';
import api from './api';

export interface CreateExpressionDto {
  name: string;
  formula: string;
  groupId: string;
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
