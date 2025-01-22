import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2563eb', // Match Tailwind's blue-500
        },
        secondary: {
            main: '#f43f5e', // Match Tailwind's pink-500
        },
    },
});

export default theme;
