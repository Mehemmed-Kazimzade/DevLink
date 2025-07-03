import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import FlexCenterBox from "../components/ui/FlexContainer";
import RsTypography from "../components/ui/RsTypography";
import RsInput from "../components/ui/RsInput";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RsButton from "../components/ui/RsButton";
import OrDivider from "../components/ui/OrDivider";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import RsIcon from "../components/ui/RsIcon";
import { Link } from "react-router-dom";
import PasswordInput from "../components/ui/PasswordInput";

export default function Login() {
    const theme = useTheme();

    return <>
        <FlexCenterBox>

            <Paper sx={{ width: "100%", maxWidth: "600px", padding:"20px", borderRadius: "20px" }}>

                <RsTypography lg="34px" xs="24px" fontWeight="bold" text="Welcome To DevLink" 
                gutterBottom textAlign={"center"} />

                <RsTypography lg="25px" xs="20px" fontWeight="bold" text="Log in to connect and collaborate." 
                gutterBottom textAlign={"center"} />

                <Stack sx={{ mt: 3 }} spacing={2}>
                    <RsInput
                        label="Your Email Address"
                        type="email"
                        placeholder="yourname@domain.com"
                        icon={<RsIcon icon={AlternateEmailIcon} />} />

                    <Box>
                        <PasswordInput />

                        <Typography fontSize={"15px"}
                        sx={{ mt: 1, fontWeight: "bold", 
                        color: theme.palette.action.active, textDecoration: "underline"}}> Forgot password? </Typography>
                    </Box>

                    <RsButton text="Login" />

                    <OrDivider />

                    <Box display={"flex"} gap={3}>
                        <RsButton icon={<GoogleIcon />} text="Google" bgColor={theme.palette.secondary.main} />
                        <RsButton icon={<GitHubIcon /> } text="GitHub" bgColor={theme.palette.secondary.main} />
                    </Box>
                        
                    <Link to="/register/">
                        <Typography sx={{color: theme.palette.action.active, textDecoration: "underline"}} 
                        fontSize={"18px"} textAlign={"center"}> Don't have an account? Register. </Typography>
                    </Link>

                </Stack>
            </Paper>
        </FlexCenterBox>
    </>
}