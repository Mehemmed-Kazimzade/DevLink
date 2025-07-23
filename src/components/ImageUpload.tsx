import { Avatar, Box, Button, Typography } from "@mui/material"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

interface ImageUploadProps {
    currValue: string,
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>((props, ref) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, []);

    const currValue = props.currValue;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    }

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <input
                ref={inputRef}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <Avatar
                src={imagePreview || currValue}
                sx={{ width: 120, height: 120 }}
                alt="Uploaded Preview"
            />
    
            <Box display={"flex"} flexDirection={"column"} gap={2}>
                <Button variant="contained" onClick={() => (ref as React.RefObject<HTMLInputElement>).current?.click()}>
                    Upload Image
                </Button>
        
                {imagePreview && (
                    <Typography variant="body2" color="text.secondary">
                        Preview loaded from local file.
                    </Typography>
                )}
            </Box>
    
        </Box>
    )
});

export default ImageUpload;