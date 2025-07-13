import { Button, useMediaQuery, useTheme } from "@mui/material";

interface RsButtonProps {
    text: string,
    onClick?: () => void,
    bgColor?: string,
    type?: any,
    icon?: React.ReactNode,
    fullWidth?: boolean
};

export default function RsButton( { text, icon,type, onClick, bgColor, fullWidth }: RsButtonProps ) {
    const isLargeScreen = useMediaQuery("(min-width: 580px)");

    return (
        <Button 
            variant="contained"
            onClick={onClick}
            fullWidth={fullWidth ?? true}
            type={type ?? "button"}
            sx={{ boxShadow: theme => theme.shadows[3], bgcolor: bgColor, borderRadius: 2,  }}
            startIcon={icon}
            size={ isLargeScreen ? "large" : "medium" }>
                {text}
        </Button>
    )
}