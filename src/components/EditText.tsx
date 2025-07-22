import { TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface EditTextProps {
    currValue: string
}

const EditText = forwardRef<HTMLInputElement, EditTextProps>(({ currValue }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, []);

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = currValue;
    }, [currValue]);

    return (
        <TextField
            inputRef={inputRef}
            variant="outlined"
            defaultValue={currValue}
            fullWidth
        />
    );
});

export default EditText;
