'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import themeReducer from './theme/slice';

const rootReducer = combineReducers({
  theme: themeReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
