import React from 'react';
import BookList from './components/BookList';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5', // L
        },
        text: {
            primary: '#333',
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ py: 4 }}>
                <BookList />
            </Container>
        </ThemeProvider>
    );
};

export default App;