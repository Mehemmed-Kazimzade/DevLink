import { TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { sxForWordBreaking } from "../../constants/SxForWordBreaking";

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
            sx={sxForWordBreaking}
            inputRef={inputRef}
            variant="outlined"
            defaultValue={currValue}
            fullWidth
        />
    );
});

export default EditText;
