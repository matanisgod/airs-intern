import { PaletteColorOptions } from '@mui/material';

import NotoBold from '@/assets/fonts/NotoSans-Bold.ttf';
import NotoBoldItalic from '@/assets/fonts/NotoSans-BoldItalic.ttf';
import NotoItalic from '@/assets/fonts/NotoSans-Italic.ttf';
import NotoRegular from '@/assets/fonts/NotoSans-Regular.ttf';

declare module '@mui/material/styles' {
  interface Palette {
    header: Palette['primary'];
    sidebar: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    header: PaletteColorOptions;
    sidebar: PaletteColorOptions;
  }
}

// Function That Generate theme Config
export const themeSelector = () => ({
  palette: {
    background: {
      default: '#12182B', // 배경 색
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: '0',
          width: '100%',
          height: '100%',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        img: {
          userSelect: 'none',
        },
        '#root': {
          margin: '0',
          width: '100%',
          height: '100%',
        },
        '.MuiAutocomplete-popper .MuiAutocomplete-listbox': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4f4f4f',
            backgroundClip: 'padding-box',
            borderTop: '3px solid transparent',
            borderBottom: '3px solid transparent',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#222222',
          },
        },
        '.hide': {
          visibility: 'hidden',
          opacity: 0,
          display: 'none !important',
        },
        '*:focus': {
          outline: 'none',
          border: 'none',
        },
        '@font-face': {
          fontFamily: 'NotoSans',
          fontStyle: 'normal',
          fontWeight: 'normal',
          src: `url(${NotoRegular}) format('truetype')`,
        },

        fallbacks: [
          {
            '@font-face': {
              fontFamily: 'NotoSans',
              fontStyle: 'normal',
              fontWeight: 'bold',
              src: `url(${NotoBold}) format('truetype')`,
            },
          },
          {
            '@font-face': {
              fontFamily: 'NotoSans',
              fontStyle: 'italic',
              fontWeight: 'normal',
              src: `url(${NotoItalic}) format('truetype')`,
            },
          },
          {
            '@font-face': {
              fontFamily: 'NotoSans',
              fontStyle: 'italic',
              fontWeight: 'bold',
              src: `url(${NotoBoldItalic}) format('truetype')`,
            },
          },
        ],
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['NotoSans'].join(','),
  },
});
