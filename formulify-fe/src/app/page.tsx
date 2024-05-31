'use client';

import CreateExpressionWrapper from '@/features/formula/components/CreateExpressionWrapper';
import EvaluationForm from '@/features/formula/components/EvaluationForm';
import ExpressionList from '@/features/formula/components/ExpressionList';

import { Tabs, rem } from '@mantine/core';
import { IconCalculator, IconMath } from '@tabler/icons-react';

export default function Home() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <main className="p-5 w-full relative">
      <Tabs defaultValue="formulas">
        <Tabs.List>
          <Tabs.Tab
            value="formulas"
            leftSection={<IconMath style={iconStyle} />}
          >
            Formulas
          </Tabs.Tab>
          <Tabs.Tab
            value="evaluate"
            leftSection={<IconCalculator style={iconStyle} />}
          >
            Evaluate
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="formulas" className="flex gap-10 w-full">
          <CreateExpressionWrapper groupId="75e29679-e5bf-4be2-8803-ea70591c8548" />
          <ExpressionList />
        </Tabs.Panel>

        <Tabs.Panel value="evaluate" className="flex gap-10 w-full">
          <ExpressionList />
        </Tabs.Panel>
      </Tabs>
    </main>
  );
}
