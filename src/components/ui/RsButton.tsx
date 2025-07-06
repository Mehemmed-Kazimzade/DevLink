import { Button, useMediaQuery, useTheme } from "@mui/material";

interface RsButtonProps {
    text: string,
    onClick?: () => void,
    bgColor?: string,
    type?: any,
    icon?: React.ReactNode
};

export default function RsButton( { text, icon,type, onClick, bgColor }: RsButtonProps ) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Button 
            variant="contained"
            onClick={onClick}
            fullWidth
            type={type !== null ? type : 'button'}
            sx={{ boxShadow: theme => theme.shadows[3], bgcolor: bgColor, borderRadius: 2,  }}
            startIcon={icon}
            size={ isLargeScreen ? "large" : "medium" }>
                {text}
        </Button>
    )
}