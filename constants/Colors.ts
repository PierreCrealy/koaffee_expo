/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#333333';
const tintColorDark = '#B3D8DE';

export const Colors = {
  light: {
    text: '#333333',
    background: '#fff',
    tint: tintColorLight,
    icon: '#333333',
    tabIconDefault: '#333333',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#D1E8EC',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },

  // Main brand colors
  primary: {
    light: '#B3D8DE', // Light version of main color
    main: '#FFFFFF', // Main brand color
    dark: '#333333', // Darker version of main color
  },
  // Secondary/accent colors
  secondary: {
    light: '#FFE9C7',
    main: '#F2C94C', // Complementary yellow/gold
    dark: '#E0B03D',
  },
  // Status colors
  success: {
    light: '#4CAF50',
    main: '#6FCF97',
    dark: '#4CAF7D',
  },
  warning: {
    light: '#FFE8D2',
    main: '#F2994A',
    dark: '#E67E22',
  },
  error: {
    light: '#FADADD',
    main: '#EB5757',
    dark: '#C62828',
  },
  // Neutral colors
  neutral: {
    100: '#FFFFFF',
    200: '#F2F2F2',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#828282',
    600: '#4F4F4F',
    700: '#333333',
    800: '#1A1A1A',
  },
  // App-specific colors
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#828282',
  border: '#E0E0E0',
  notification: '#EB5757',
  tabIconDefault: '#BDBDBD',
  tabIconSelected: '#B3D8DE',
  // success: '#4CAF50',
};
