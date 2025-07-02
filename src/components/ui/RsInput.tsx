import { Box, FormControl, OutlinedInput, Typography } from "@mui/material";
import { v4 as idGenerator } from "uuid";

interface RsInputProps {
    label: string,
    type: string,
    placeholder?: string,
    icon?: React.ReactNode,
};

export default function RsInput({ label, type, placeholder, icon }: RsInputProps) {
    const id: string = `input-${idGenerator()}`;

    return (
        <FormControl fullWidth variant="standard">
            <Typography gutterBottom fontWeight={"bold"}> {label} </Typography>
            <Box display={"flex"} alignItems={"center"}>
                { icon }
                <OutlinedInput
                    id={id}
                    type={type}
                    sx={{ ml: 1, boxShadow: theme => theme.shadows[1] }}
                    placeholder={placeholder}
                    fullWidth
                />
            </Box>
        </FormControl>
    )
};