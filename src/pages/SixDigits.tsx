import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Digit from "../components/Digit";
import React, { useEffect, useState } from "react";
import MotionDivWrapper from "../components/MotionDivWrapper";
import RsTypography from "../components/ui/RsTypography";
import RsButton from "../components/ui/RsButton";
import CheckIcon from '@mui/icons-material/Check';

export default function SixDigits() {
    const theme = useTheme();
    const isDesktop = useMediaQuery("(min-width: 580px)");
    const [values, setValues] = useState<string[]>(Array(6).fill(""));
    const refs: React.RefObject<HTMLInputElement | null>[] = Array(6).fill(null).
            map(() => React.createRef<HTMLInputElement>());


    useEffect(() => {
        refs[0].current?.focus();
    }, []);

    const handleFocus = (n: number) => {
        refs[n].current?.focus();
    }

    const handleChange = (newValue: string, place: number) => setValues(prev => prev.map((value, idx) => idx !== place ? value : newValue ));

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData("text");
        const pattern = /^[0-9]*$/;

        if(text.length === 6 && pattern.test(text)) {
            setValues(prev => prev.map((_, idx) => text[idx]));
            handleFocus(5);
        };
    }

    return (
        <MotionDivWrapper>
            <Box className="centered-container">
                <form>
                    <RsTypography lg="36px" xs="23px" fontWeight="bold" text="Verification Code Was Sent" 
                    gutterBottom textAlign={"center"} />

                    <Paper className="paper">
                        <Stack spacing={isDesktop ? 3 : 5} alignItems={"center"} p={isDesktop ? 2 : 0.5}>
                            <Typography variant="h5"> Enter the 6 digit code </Typography>
                            <Box display={"flex"} gap={isDesktop ? 3 : 1.5} justifyContent={"center"}>
                                {refs.map((ref, idx) => (
                                    <Digit key={idx}  ref={ref} value={values[idx]}
                                    handleChange={handleChange} handlePaste={handlePaste} handleFocus={handleFocus} place={idx}  />
                                ))}
                            </Box>
                            <Box display={"flex"} width={"100%"} justifyContent={"space-between"} 
                                alignItems={"center"} flexDirection={ isDesktop ? "row" : "column-reverse" } gap={3}>

                                <Button variant="text" sx={{color: theme.palette.secondary.main}}>
                                    Resend the Code
                                </Button>

                                <RsButton fullWidth={!isDesktop} type={"submit"} text="Submit" icon={<CheckIcon/>} />
                            </Box>
                        </Stack>
                    </Paper>

                </form>
            </Box>
        </MotionDivWrapper>
    )
}