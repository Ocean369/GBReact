
import { red, green, blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        secondary: {
            main: '#ff8a80',
            title: blue.A700
        },

    },
    typography: {
        h3: {
            fontSize: '2.2rem',
        }
    },
});

export default theme;