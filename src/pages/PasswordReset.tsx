import { Box, Paper, Stack, Typography } from "@mui/material";
import MotionDivWrapper from "../components/MotionDivWrapper";
import RsTypography from "../components/ui/RsTypography";
import RsInput from "../components/ui/RsInput";
import { useForm } from "react-hook-form";
import RsButton from "../components/ui/RsButton";

interface FormData {
    email: string;
}

export default function PasswordReset() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSave = (data: FormData) => {
        console.log(data.email);
    }

    return (
        <MotionDivWrapper>
            <Box className="passwordResetBox">
                <form onSubmit={handleSubmit(onSave)}>
                    <Paper sx={{ width: "100%", maxWidth: "600px", padding:"20px", borderRadius: "20px" }}>
                    <Stack spacing={1.5}>
                        <RsTypography lg="30px" xs="20px" fontWeight="bold" 
                        text="Enter your email address to receive a verification code" 
                        gutterBottom textAlign={"center"} />

                        <RsInput 
                            label="Your Email"
                            type="email"
                            placeholder="....@gmail.com"
                            register={register("email", {
                                required: "Please fill the email",
                                validate: value => value.includes("@") || "Email must contain '@' symbol." 
                            })}
                        />
        
                        <Typography color="error"> { errors.email?.message } </Typography>

                        <RsButton text={"Submit email"} type="submit" />
                    </Stack>
                </Paper>
                </form>
            </Box>
        </MotionDivWrapper>
    )
}