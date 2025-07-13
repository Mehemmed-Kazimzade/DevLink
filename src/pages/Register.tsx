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
import MotionDivWrapper from "../components/MotionDivWrapper";
import { useForm } from "react-hook-form";
import type { RegisterForm } from "../types/RegisterForm";
import apiRegister from "../api/apiRegister";

export default function Register() {
    const theme = useTheme();

    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterForm>();

    const onSave = async (registerFormData: RegisterForm) => {
        const {status, data} = await apiRegister(registerFormData);

        if(status === "SUCCESS") {
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
            
            <form onSubmit={handleSubmit(onSave)}>
                <FlexCenterBox>

                    <Paper className="paper">

                        <RsTypography lg="30px" xs="23px" fontWeight="bold" text="Create your DevLink account" 
                        gutterBottom textAlign={"center"} />

                        <Stack sx={{ mt: 2 }} spacing={1.5}>
                            <RsInput
                                register={register("fullName", {
                                    required: "Full name is required",
                                    minLength: { value: 5, message: "Must be at least 5 chars" },
                                    maxLength: { value: 25, message: "Must be less than 25 chars" },
                                    pattern: { value: /^[A-Za-z\s]+$/, message: "Only English letters are allowed for full name" },
                                })}
                                
                                label="Your Full Name"
                                type="text"
                                placeholder="John Doe"
                                icon={ <RsIcon icon={TextFormatIcon} /> }
                                />
                            
                            { errors.fullName && <Typography color="error"> {errors.fullName.message} </Typography> }

                            <RsInput
                                register={register("email", {
                                    required: "Email is required",
                                    minLength: {value: 10, message: "Must be at least 10 chars"},
                                    validate: value => value.includes("@") || "Email must contain an '@' symbol.",
                                })}
                                
                                label="Your Email Address"
                                type="email"
                                placeholder="yourname@domain.com"
                                icon={<RsIcon icon={AlternateEmailIcon} />} />

                            { errors.email && <Typography color="error"> {errors.email.message} </Typography> }

                            <PasswordInput register={register("password", {
                                required: true,
                                pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, message: 
                                    "Password must be 8+ chars, with uppercase, lowercase, and a number."}
                                })} />
                            
                            { errors.password && <Typography color="error"> {errors.password.message} </Typography> }

                            <RsButton type={"submit"} text="Register" />

                            <OrDivider />

                            <Box display={"flex"} gap={4}>
                                <RsButton icon={<GoogleIcon />} text="Google" bgColor={theme.palette.secondary.main} />
                                <RsButton icon={<GitHubIcon /> } text="GitHub" bgColor={theme.palette.secondary.main} />
                            </Box>

                            <Link to={"/login/"}>
                                <Typography className="link" sx={{color: theme.palette.secondary.main, width: "fit-content", mx: "auto"}}
                                fontSize={"18px"} textAlign={"center"}> Have an account? Login </Typography>
                            </Link>

                        </Stack>
                    </Paper>
                </FlexCenterBox>
            </form>
        </MotionDivWrapper>
    )
}