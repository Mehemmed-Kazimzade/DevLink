import type { MUIIconType } from "../../types/MuiIcon";
import { useMediaQuery, useTheme } from "@mui/material";

interface RsIconProps {
    icon: MUIIconType
}

export default function RsIcon( { icon }: RsIconProps ) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

    const Icon = icon;
    return ( <Icon sx={{ fontSize: isLargeScreen ? "30px" : "24px" }} ></Icon>
    )
}
