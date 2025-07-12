import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import { ThemeProvider } from '@emotion/react';
import Header from './components/ui/Header';
import { useCallback, useEffect, useMemo, useState } from 'react';
import getTheme from './contexts/theme';
import GlobalStylesProvider from './contexts/GlobalStyles';

export default function App() {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        const stored = localStorage.getItem("mode");
        if (stored) setMode(stored); 
    }, []);
    
    const theme = useMemo(() => getTheme(mode), [mode]);
    
    const toggleMode = useCallback(() => {
        setMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('mode', newMode);
            return newMode;
        });
    }, []);

    return <>
        <ThemeProvider theme={theme}>
            <GlobalStylesProvider />
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Header mode={mode} toggleMode={toggleMode} />}>
                        {AuthRoutes}
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </>
};