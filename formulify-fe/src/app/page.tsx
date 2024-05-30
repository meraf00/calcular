'use client';

import CreateExpressionWrapper from '@/features/formula/components/CreateExpressionWrapper';
import ExpressionList from '@/features/formula/components/ExpressionList';
import { Tabs, rem } from '@mantine/core';
import { IconMath, IconPlus } from '@tabler/icons-react';

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
          <Tabs.Tab value="create" leftSection={<IconPlus style={iconStyle} />}>
            Add Formula
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="create" className="w-full">
          <CreateExpressionWrapper />
        </Tabs.Panel>

        <Tabs.Panel value="formulas">
          <ExpressionList />
        </Tabs.Panel>
      </Tabs>
    </main>
  );
}
