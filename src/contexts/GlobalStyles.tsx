import { GlobalStyles, useTheme } from "@mui/material";

export default function GlobalStylesProvider() {
    const theme = useTheme();

    return (
        <>
            <GlobalStyles styles={{ 
                body: {
                    background: theme.palette.mode === "light" ? "linear-gradient(135deg, #f0f4f8 0%, #d9e4f5 50%, #cfe0fc 100%)" : "linear-gradient(160deg, #1c1c1c 0%, #2c2c3e 100%)",
                }
             }} />
        </>
    )
}