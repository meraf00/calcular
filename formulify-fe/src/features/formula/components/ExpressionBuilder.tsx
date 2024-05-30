import { MultiSelectInput } from '@/components/MultiSelectInput';
import { Expression, validateName } from '@/lib/models/expression';

export interface ExpressionBuilderProps {
  expressions: Expression[];
}

const operators = [
  {
    value: '+',
    label: '+',
  },
  {
    value: '-',
    label: '-',
  },
  {
    value: '*',
    label: '*',
  },
];

export const ExpressionBuilder = ({ expressions }: ExpressionBuilderProps) => {
  const options = [
    ...operators,
    ...expressions.map((e) => ({ value: e.id, label: e.name })),
  ];

  const dataBuilder = (value: string) => {
    if (Number(value)) {
      return [{ value: value, label: value }];
    }

    // if (validateName(value)) {
    //   return [{ value: value, label: value }];
    // }

    return options;
  };

  return <MultiSelectInput onChange={console.log} dataBuilder={dataBuilder} />;
};
