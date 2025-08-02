import { TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { sxForWordBreaking } from "../constants/SxForWordBreaking";

interface EditBigTextProps {
    currValue: string
}

const EditBigText = forwardRef<HTMLTextAreaElement, EditBigTextProps>(({ currValue }, ref) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, []);

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = currValue
    }, [currValue]);

    return (
        <TextField
            inputRef={inputRef}
            multiline
            minRows={3}
            maxRows={14}
            variant="outlined"
            sx={sxForWordBreaking}
            fullWidth
            defaultValue={currValue}
        />
    )
});

export default EditBigText;