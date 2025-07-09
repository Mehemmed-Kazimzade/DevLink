import { TextField } from "@mui/material";
import type React from "react";
import { useState } from "react";

export default function Digit() {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regEx = /^[0-9]*$/;
        if (value.length == 1 || !regEx.test(inputValue)) return;

        setValue(inputValue);
    }

    return (
        <TextField
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            slotProps={{
                input: {
                inputMode: 'numeric',
                style: { textAlign: 'center', fontSize: '1.5rem', width: '3rem', height: '3rem',}},
            }}
          variant="outlined"
        />
    )
}