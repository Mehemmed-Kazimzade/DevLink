import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import FlexCenterBox from "../../components/ui/FlexContainer";
import RsTypography from "../../components/ui/RsTypography";
import RsInput from "../../components/ui/RsInput";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RsButton from "../../components/ui/RsButton";
import OrDivider from "../../components/ui/OrDivider";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import RsIcon from "../../components/ui/RsIcon";
import TextFormatIcon from '@mui/icons-material/TextFormat';
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput";
import MotionDivWrapper from "../../components/MotionDivWrapper";
import { useForm } from "react-hook-form";
import type { AuthForm } from "../../types/authTypes/AuthForm";
import useAuthApi from "../../api/useAuthApi";
import fullNameValidation from "../../types/authTypes/FullNameValidation";
import emailValidation from "../../types/authTypes/EmailValidation";
import passwordValidation from "../../types/authTypes/PasswordValidation";

export default function Register() {
    const theme = useTheme();
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors } } = useForm<AuthForm>();

    const onSave = async (registerFormData: AuthForm) => {
        const {status, data} = await useAuthApi(registerFormData, "http://localhost:8080/api/v1/auth/register/");

        if(status === "SUCCESS") {
            localStorage.setItem("token", data.token);
            navigate("/profile/");
            return;
        }

        if(status === "ERROR") {
            setError("email", { type: "server", message: data }, {shouldFocus: true});
            return;
        }

        setError("root", {type:"server", message: "Unexpected error occurred"});
    }

    return (
        <MotionDivWrapper>
            
            <RsTypography lg="30px" xs="23px" fontWeight="bold" text="Create your DevLink account" textAlign={"center"} />

            <form onSubmit={handleSubmit(onSave)}>
                <FlexCenterBox>
                    <Paper className="paper">
                        <Stack sx={{ mt: 1 }} spacing={1.5}>
                            <RsInput
                                register={register("fullName", fullNameValidation)}
                                label="Your Full Name"
                                type="text"
                                placeholder="John Doe"
                                icon={ <RsIcon icon={TextFormatIcon} /> }
                                />
                            
                            { errors.fullName && <Typography color="error"> {errors.fullName.message} </Typography> }

                            <RsInput
                                register={register("email", emailValidation)}
                                label="Your Email Address"
                                type="email"
                                placeholder="yourname@domain.com"
                                icon={<RsIcon icon={AlternateEmailIcon} />} />

                            { errors.email && <Typography color="error"> {errors.email.message} </Typography> }

                            <PasswordInput register={register("password", passwordValidation)} />
                            
                            { errors.password && <Typography color="error"> {errors.password.message} </Typography> }

                            <RsButton type={"submit"} text="Register" />

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
                <Link to={"/login/"}>
                    <Typography className="link" sx={{color: theme.palette.secondary.main }}
                    fontSize={"18px"}> Have an account? Login </Typography>
                </Link>
            </Box>

        </MotionDivWrapper>
    )
}