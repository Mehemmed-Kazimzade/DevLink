import { TextField } from "@mui/material";
import React from "react";

interface DigitProps {
    place: number,
    value: string,
    handleChange: (newValue: string, place: number) => void,
    handleFocus: (n: number) => void,
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void,
}

const Digit = React.forwardRef<HTMLInputElement, DigitProps>(({ place, value, handleChange, handleFocus, handlePaste }, ref) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if((e.key === "Backspace") && value === "" && place !== 0){
            handleFocus(place - 1);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const regEx = /^[0-9]*$/;
        if (inputValue.length > 1 || !regEx.test(inputValue)) return;

        handleChange(inputValue, place);

        if(inputValue.length === 1 && place !== 5) {
            handleFocus(place + 1);
        }
    }

    return (
        <TextField
            inputRef={ref}
            value={value}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
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