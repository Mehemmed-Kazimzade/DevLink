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
                <form style={{ width: "100%", maxWidth: "600px" }}>
                    <RsTypography lg="36px" xs="25px" fontWeight="bold" text="Verification Code Was Sent" 
                    gutterBottom textAlign={"center"} />

                    <Paper className="paper">
                        <Stack spacing={3} alignItems={"center"} p={2}>
                            <Typography variant="h5" textAlign={"center"}> Enter the 6 digit code </Typography>
                            <Box display="grid" gridTemplateColumns={isDesktop ? "repeat(6, auto)" : "repeat(3, auto)"} 
                                rowGap={2} columnGap={isDesktop ? 3 : 2} justifyContent="center">

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