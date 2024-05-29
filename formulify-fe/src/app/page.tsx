'use client';

import ExpressionForm from '@/features/formula/components/ExpressionForm';

export default function Home() {
  

  return (
    <main className="flex justify-center">
      <div className="flex w-full p-5">
        <ExpressionForm onSubmit={console.log} />
      </div>
    </main>
  );
}
