import { Box, Paper} from "@mui/material";
import RsTypography from "../components/ui/RsTypography";
import RsButton from "../components/ui/RsButton";
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import MotionDivWrapper from "../components/MotionDivWrapper";

export default function LogoutSuccess() {
    return <>
        <MotionDivWrapper>
            <Box className="logoutBox">
                <Paper className="paper">
                    <RsTypography lg="20px" xs="24px" fontWeight="bold" text="Successfully logged out. Thanks for using DevLink" 
                    gutterBottom textAlign={"center"} />

                    <Link to={""} className="button-link">
                        <RsButton text="Login Again" icon={<LoginIcon />} />
                    </Link>
                </Paper>
            </Box>
        </MotionDivWrapper>
    </>
}