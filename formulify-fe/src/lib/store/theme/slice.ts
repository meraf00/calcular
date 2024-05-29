'use client';

import { createSlice } from '@reduxjs/toolkit';
import { THEME, AppTheme } from './types';

const themeInitialState: AppTheme = {
  colorScheme: 'light',
};

const themeSlice = createSlice({
  name: THEME,
  initialState: themeInitialState,
  reducers: {
    set(state, { payload: { colorScheme } }) {
      state.colorScheme = colorScheme;

      localStorage.setItem('theme', JSON.stringify({ colorScheme }));
    },

    load(state) {
      const themeString = localStorage.getItem('theme');

      let theme: AppTheme = themeInitialState;

      try {
        if (themeString) theme = JSON.parse(themeString!);
      } catch (e) {}

      state.colorScheme = theme.colorScheme;
    },
  },
});

export const { set, load } = themeSlice.actions;

export default themeSlice.reducer;
