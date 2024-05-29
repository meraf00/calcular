'use client';

import ExpressionForm from '@/features/formula/components/ExpressionForm';
import { test } from '@/lib/models/expression';
import { Tabs, rem } from '@mantine/core';
import {
  IconList,
  IconMath,
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconSettings,
} from '@tabler/icons-react';

export default function Home() {
  const iconStyle = { width: rem(12), height: rem(12) };
  test();
  return (
    <main className="p-5 w-full">
      <Tabs defaultValue="create">
        <Tabs.List>
          <Tabs.Tab
            value="messages"
            leftSection={<IconMath style={iconStyle} />}
          >
            Formulas
          </Tabs.Tab>
          <Tabs.Tab value="create" leftSection={<IconPlus style={iconStyle} />}>
            Add Formula
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="create" className="w-full">
          <div className="flex w-1/3 p-5">
            <ExpressionForm onSubmit={console.log} />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
      </Tabs>
    </main>
  );
}
