'use client';

import CreateExpressionWrapper from '@/features/formula/components/CreateExpressionWrapper';
import { test } from '@/lib/models/expression';
import { Tabs, rem } from '@mantine/core';
import { IconMath, IconPlus, IconVariable } from '@tabler/icons-react';

export default function Home() {
  const iconStyle = { width: rem(12), height: rem(12) };
  test();

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
            value="variables"
            leftSection={<IconVariable style={iconStyle} />}
          >
            Variables
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="variables" className="w-full">
          Variables
        </Tabs.Panel>

        <Tabs.Panel value="formulas" className="flex gap-5 w-1/2">
          <CreateExpressionWrapper />
          {/* <ExpressionList /> */}
        </Tabs.Panel>
      </Tabs>
    </main>
  );
}
