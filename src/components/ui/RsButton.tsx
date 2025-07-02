import { Button, useMediaQuery, useTheme } from "@mui/material";

interface RsButtonProps {
    text: string,
    bgColor?: string,
    icon?: React.ReactNode
};

export default function RsButton( { text, icon, bgColor }: RsButtonProps ) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Button 
            variant="contained"
            fullWidth
            sx={{ boxShadow: theme => theme.shadows[3], bgcolor: bgColor }}
            startIcon={icon}
            size={ isLargeScreen ? "large" : "medium" }>
                {text}
        </Button>
    )
}