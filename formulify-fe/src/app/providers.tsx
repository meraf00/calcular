'use client';

import { AppStore, makeStore } from '@/lib/store';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';

import { load, set } from '@/lib/store/theme/slice';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const colorScheme = useAppSelector((state) => state.theme.colorScheme);

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <Notifications />

      <div className={colorScheme}>
        {children}

        <div className="fixed bottom-0 right-0 z-40">
          <div
            className="rounded-full p-2 m-3 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white dark:text-dark"
            onClick={() =>
              dispatch(
                set({
                  colorScheme: colorScheme === 'light' ? 'dark' : 'light',
                })
              )
            }
          >
            {colorScheme === 'light' ? <IconMoon /> : <IconSun />}
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};
