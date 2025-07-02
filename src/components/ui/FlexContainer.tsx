import Box from "@mui/material/Box";
import type { ReactElement } from "react";

interface FlexContainerProps {
    children: ReactElement
}

export default function FlexCenterBox({ children }: FlexContainerProps) {
    return (
        <Box display={"flex"} height={"100%"} justifyContent={"center"} alignItems={"center"} padding={3}>
            {children}
        </Box>
    );
}