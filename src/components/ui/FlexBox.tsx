import { Box } from "@mui/material";

interface FlexBoxProps {
    children?: React.ReactNode
}

export default function FlexBox({ children }: FlexBoxProps) {
    return (
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            {children}
        </Box>
    )
}
