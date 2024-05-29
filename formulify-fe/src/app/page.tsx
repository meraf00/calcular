'use client';

import ExpressionForm from '@/features/formula/components/ExpressionForm';
import { test } from '@/lib/models/expression';

export default function Home() {
  test();
  return (
    <main className="flex justify-center">
      <div className="flex w-full p-5">
        <ExpressionForm onSubmit={console.log} />
      </div>
    </main>
  );
}
