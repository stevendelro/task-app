import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8a8989',
      main: '#6d6c6c',
      dark: '#4c4b4b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ab3333',
      main: '#960000',
      dark: '#690000',
      contrastText: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
