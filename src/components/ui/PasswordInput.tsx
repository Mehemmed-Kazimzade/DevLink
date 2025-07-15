import { type UseFormRegister, type FieldValues } from "react-hook-form";
import { FormControl, OutlinedInput, IconButton, InputAdornment, Typography, Box, useMediaQuery } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import KeyIcon from '@mui/icons-material/Key';
import RsIcon from "./RsIcon";

interface PasswordInputProps {
    register?: ReturnType<UseFormRegister<FieldValues>>;
}

export default function PasswordInput( { register }: PasswordInputProps ) {
    const isLargeScreen = useMediaQuery("(min-width: 580px)");
    const [showPassword, setShowPassword] = useState(true);

    const handleShowPassword = () => setShowPassword(prev => !prev);

    return (
        <FormControl fullWidth>

            <Typography gutterBottom fontWeight={"bold"}> Your Password </Typography>
            
            <Box display={"flex"} alignItems={"center"} width={"100%"}>
                <RsIcon icon={KeyIcon} />
                <OutlinedInput sx={{ ml: isLargeScreen ? 1 : 0, boxShadow: theme => theme.shadows[1] }}
                    {...register}
                    fullWidth
                    size="small"
                    placeholder="********"
                    type={showPassword ? "password" : "text"}

                    endAdornment = {
                        <InputAdornment position="end">
                            <IconButton aria-label={ showPassword ? 'hide the password' : 'display the password'}
                                    onClick={handleShowPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Box>
        </FormControl>
    )
}