import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#FF6464',
    },
    secondary: {
      light: '#EDF7FA',
      main: '#00ABCC',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'Heebo, sans-serif',
  },

  components:{
    MuiContainer:{
      defaultProps: {
        maxWidth: "md",
      },
      styleOverrides:{
        maxWidthMd : {
          maxWidth: '860px',

          '@media (min-width: 900px)': {
                maxWidth: '860px',
              },
      },
        maxWidthSm: {
          maxWidth: '680px',

          '@media (min-width: 600px)': {
                maxWidth: '680px',
              },
        },
      },
    },

    MuiLink:{
      defaultProps: {
        underline: 'hover'
      },
      styleOverrides:{
        root: {
          color: 'black',

          '&:hover, &.active': {
            color: '#FF6464',
          }
        }
      },
    },

    MuiButton:{
      defaultProps:{},
      styleOverrides: {},
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: 'white',
          }
        }
      ]
    }
  },
});


