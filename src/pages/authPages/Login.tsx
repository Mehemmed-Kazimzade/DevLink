import { Box, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexCenterBox from "../../components/ui/FlexContainer";
import RsTypography from "../../components/ui/RsTypography";
import RsInput from "../../components/ui/RsInput";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RsButton from "../../components/ui/RsButton";
import OrDivider from "../../components/ui/OrDivider";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import RsIcon from "../../components/ui/RsIcon";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput";
import MotionDivWrapper from "../../components/MotionDivWrapper";
import { useForm } from "react-hook-form";
import passwordValidation from "../../types/authTypes/PasswordValidation";
import type { AuthForm } from "../../types/authTypes/AuthForm";
import emailValidation from "../../types/authTypes/EmailValidation";
import useAuthApi from "../../api/useAuthApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width: 580px)");

    const {register, handleSubmit, setError, formState: { errors }} = useForm<AuthForm>();

    const onSave = async (loginFormData: AuthForm) => {
        const {status, data} = await useAuthApi(loginFormData, "http://localhost:8080/api/v1/auth/authenticate/");

        if(status === "SUCCESS") {
            localStorage.setItem("token", data.token);
            navigate("/profile/me/");
            return;
        }

        if(status === "ERROR") {
            setError("email", { type: "server", message: data }, {shouldFocus: true});
            return;
        }

        setError("root", {type:"server", message: "Unexpected error occurred"});

    }

    return <>
        <MotionDivWrapper>

            <RsTypography lg="30px" xs="24px" fontWeight="bold" text="Welcome To DevLink" 
            gutterBottom textAlign={"center"} />

            <RsTypography lg="25px" xs="18px" fontWeight="bold" text="Log in to connect and collaborate."
                textAlign={"center"} />

            <form onSubmit={handleSubmit(onSave)}> 
                <FlexCenterBox>
                    <Paper className="paper">
                        <Stack sx={{ mt: 1 }} spacing={isDesktop ? 2 : 2.5}>
                            <RsInput
                                label="Your Email Address"
                                type="email"
                                register={register("email", emailValidation)}
                                placeholder="yourname@domain.com"
                                icon={<RsIcon icon={AlternateEmailIcon} />} />
                            
                            { errors.email && <Typography color="error"> {errors.email.message} </Typography> }

                            <Box>
                                <PasswordInput
                                    register={register("password", passwordValidation)}
                                />
                                
                                { errors.password && <Typography color="error"> {errors.password.message} </Typography> }

                                <Link to={""}>
                                    <Typography className="link" fontSize={"15px"} sx={{ mt: 1, width: "fit-content", color: theme.palette.action.active}}>
                                        Forgot password?
                                    </Typography>
                                </Link>

                            </Box>

                            <RsButton type={"submit"} text="Login" />


                            <OrDivider />
                            <Box display={"flex"} gap={4}>
                                <RsButton icon={<GoogleIcon />} text="Google" bgColor={theme.palette.secondary.main} />
                                <RsButton icon={<GitHubIcon /> } text="GitHub" bgColor={theme.palette.secondary.main} />
                            </Box>
                        </Stack>
                    </Paper>
                </FlexCenterBox>
            </form>

            <Box maxWidth={"fit-content"} mx={"auto"}>
                <Link to="/register/">
                    <Typography className="link" sx={{color: theme.palette.secondary.main}} fontSize={"18px"}>
                        Become a member
                    </Typography>
                </Link>
            </Box>

        </MotionDivWrapper>
    </>
}