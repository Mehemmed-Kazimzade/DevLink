import type { MUIIconType } from "../../types/MuiIcon";
import { useMediaQuery } from "@mui/material";

interface RsIconProps {
    icon: MUIIconType
}

export default function RsIcon( { icon }: RsIconProps ) {
    const isLargeScreen = useMediaQuery("(min-width: 580px)");

    const Icon = icon;
    return ( isLargeScreen && <Icon sx={{ fontSize: isLargeScreen ? "30px" : "24px" }} ></Icon>
    )
}
