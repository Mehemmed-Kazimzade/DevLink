import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import { ThemeProvider } from '@emotion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import getTheme from './contexts/theme';
import GlobalStylesProvider from './contexts/GlobalStyles';
import DrawerComponent from './components/ui/Drawer';
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import { store } from "./slices/store";
import Q_A_Rotues from "./routes/Q_A_Rotues";

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
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStylesProvider />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<DrawerComponent mode={mode} toggleMode={toggleMode} />}>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/profile/" element={<Profile />} />
                            </Route>
                            <Route path="/QA/">
                                { Q_A_Rotues }
                            </Route>
                            {AuthRoutes}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </>
};