import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

interface DigitProps {
    place: number,
    handleFocus: (n: number) => void,
}

const Digit = React.forwardRef<HTMLInputElement, DigitProps>(({ place, handleFocus }, ref) => {
    const [value, setValue] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Backspace" && value === "" && place !== 0){
            handleFocus(place - 1);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regEx = /^[0-9]*$/;
        if (inputValue.length > 1 || !regEx.test(inputValue)) return;

        setValue(inputValue);

        if(inputValue.length === 1 && place !== 5) {
            handleFocus(place + 1);
        }
    }

    return (
        <TextField
            inputRef={ref}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            slotProps={{
                input: {
                inputMode: 'numeric',
                style: { textAlign: 'center', fontSize: '1.5rem', width: '3rem', height: '3rem',}},
            }}
          variant="outlined"
        />
    )
})

export default Digit;