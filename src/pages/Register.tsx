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
import TextFormatIcon from '@mui/icons-material/TextFormat';
import { Link } from "react-router-dom";
import PasswordInput from "../components/ui/PasswordInput";

export default function Register() {
    const theme = useTheme();

    return (
        <FlexCenterBox>

            <Paper sx={{ width: "100%", maxWidth: "600px", padding:"20px", borderRadius: "20px" }}>

                <RsTypography lg="35px" xs="28px" fontWeight="bold" text="Create your DevLink account" 
                gutterBottom textAlign={"center"} />

                <Stack sx={{ mt: 2 }} spacing={2}>
                    <RsInput
                        label="Your Full Name"
                        type="text"
                        placeholder="John Doe"
                        icon={ <RsIcon icon={TextFormatIcon} /> }
                    />

                    <RsInput
                        label="Your Email Address"
                        type="email"
                        placeholder="yourname@domain.com"
                        icon={<RsIcon icon={AlternateEmailIcon} />} />

                    <PasswordInput />

                    <RsButton text="Register" />

                    <OrDivider />

                    <Box display={"flex"} gap={3}>
                        <RsButton icon={<GoogleIcon />} text="Google" bgColor={theme.palette.secondary.main} />
                        <RsButton icon={<GitHubIcon /> } text="GitHub" bgColor={theme.palette.secondary.main} />
                    </Box>

                    <Link to={"/login/"}>
                        <Typography sx={{color: theme.palette.action.active}}  fontSize={"18px"} textAlign={"center"}> Have an account? Login </Typography>
                    </Link>

                </Stack>

            </Paper>

        </FlexCenterBox>
    )
}