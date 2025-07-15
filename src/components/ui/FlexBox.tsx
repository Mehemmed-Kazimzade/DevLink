import { Box, useMediaQuery } from "@mui/material";

interface FlexBoxProps {
    children?: React.ReactNode
}

export default function FlexBox({ children }: FlexBoxProps) {
    const isDesktop = useMediaQuery("(min-width: 580px)");

    return (
        <Box display={"flex"} alignItems={"center"} gap={isDesktop ? 2 : 3} flexDirection={isDesktop ? "row" : "column-reverse"} >
            {children}
        </Box>
    )
}
