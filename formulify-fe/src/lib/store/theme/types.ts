export const THEME = 'THEME';
export const LOAD_THEME = `${THEME}/load`;
export const SAVE_THEME = `${THEME}/save`;
export const SET_THEME = `${THEME}/set`;

export type ColorScheme = 'dark' | 'light';

export interface AppTheme {
  colorScheme: 'dark' | 'light';
}
