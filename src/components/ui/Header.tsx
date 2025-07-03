import { Box, IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from "@mui/icons-material/LightMode";
import { Outlet } from "react-router-dom";

interface HeaderProps {
    mode: string,
    toggleMode: () => void,
};

export default function Header( {mode, toggleMode}: HeaderProps ) {
    return <>
        <Box>
            <IconButton onClick={toggleMode} color="inherit">
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Box>

        <Outlet />
    </>
}