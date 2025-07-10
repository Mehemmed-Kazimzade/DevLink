import { Box } from "@mui/material";
import Digit from "../components/Digit";
import React from "react";

export default function SixDigits() {
    const refs: React.RefObject<HTMLInputElement | null>[] = Array(6).fill(null).
            map(() => React.createRef<HTMLInputElement>());

    const handleFocus = (n: number) => {
        refs[n].current?.focus();
    }

    return (
        <Box>
            {refs.map((ref, idx) => (
                <Digit key={idx} ref={ref} handleFocus={handleFocus} place={idx}  />
            ))}
        </Box>
    )
}