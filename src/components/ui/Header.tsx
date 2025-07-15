import { Box, IconButton, Typography } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, Outlet } from "react-router-dom";
import FlexBox from "./FlexBox";

interface HeaderProps {
    mode: string,
    toggleMode: () => void,
};

export default function Header( {mode, toggleMode}: HeaderProps ) {
    return <>
        <Box display={"flex"} justifyContent={"space-between"} gap={"10px"} padding={"10px"} boxShadow={theme => theme.shadows[1]}>
            <FlexBox>
                <>
                    <Link to={""}> 
                        <Typography className="link"> Profile </Typography>
                    </Link>
                    <Link to={""}> 
                        <Typography className="link"> Q&A Community </Typography>
                    </Link>
                    <Link to={""}> 
                        <Typography className="link"> Groups </Typography>
                    </Link>
                    <Link to={""}> 
                        <Typography className="link"> Dashboard </Typography>
                    </Link>
                </>
            </FlexBox>

            <FlexBox>
                <>
                    <Link to={""}> 
                        <Typography className="link"> Login </Typography>
                    </Link>

                    <IconButton onClick={toggleMode} color="inherit">
                        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </>
            </FlexBox>
        </Box>

        <Outlet />
    </>
}