import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import theme from "./contexts/theme";

export default function App() {
    return <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthRoutes />
            </BrowserRouter>
        </ThemeProvider>
    </>
};