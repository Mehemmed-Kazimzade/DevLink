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
import MotionDivWrapper from "../components/MotionDivWrapper";

export default function Login() {
    const theme = useTheme();

    return <>
        <MotionDivWrapper>
            <FlexCenterBox>
                <Paper sx={{ width: "100%", maxWidth: "600px", padding:"20px", borderRadius: "20px" }}>

                    <RsTypography lg="30px" xs="24px" fontWeight="bold" text="Welcome To DevLink" 
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

                            <Link to={""}>
                                <Typography className="link" fontSize={"15px"} sx={{ mt: 1, width: "fit-content", color: theme.palette.action.active}}>
                                    Forgot password?
                                </Typography>
                            </Link>

                        </Box>

                        <RsButton text="Login" />

                        <OrDivider />

                        <Box display={"flex"} gap={4}>
                            <RsButton icon={<GoogleIcon />} text="Google" bgColor={theme.palette.secondary.main} />
                            <RsButton icon={<GitHubIcon /> } text="GitHub" bgColor={theme.palette.secondary.main} />
                        </Box>
                            
                        <Link to="/register/">
                            <Typography className="link" sx={{color: theme.palette.secondary.main, width: "fit-content", mx: "auto"}} 
                            fontSize={"18px"} textAlign={"center"}> Become a member </Typography>
                        </Link>

                    </Stack>
                </Paper>
            </FlexCenterBox>
        </MotionDivWrapper>
    </>
}