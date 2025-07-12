import { Box } from "@mui/material";
import Digit from "../components/Digit";
import React, { useState } from "react";

export default function SixDigits() {
    const [values, setValues] = useState<string[]>(Array(6).fill(""));
    const refs: React.RefObject<HTMLInputElement | null>[] = Array(6).fill(null).
            map(() => React.createRef<HTMLInputElement>());

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
        <Box>
            {refs.map((ref, idx) => (
                <Digit key={idx}  ref={ref} value={values[idx]}
                handleChange={handleChange} handlePaste={handlePaste} handleFocus={handleFocus} place={idx}  />
            ))}
        </Box>
    )
}