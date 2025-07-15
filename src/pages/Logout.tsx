import { Box, Paper} from "@mui/material";
import RsTypography from "../components/ui/RsTypography";
import RsButton from "../components/ui/RsButton";
import { Link } from "react-router-dom";
import FlexBox from "../components/ui/FlexBox";
import MotionDivWrapper from "../components/MotionDivWrapper";

export default function Logout() {
    return <>
        <MotionDivWrapper>
            <Box className="centered-container">
                <Paper className="paper">
                    <RsTypography lg="34px" xs="24px" fontWeight="bold" text="Are you sure you want to logout" 
                    sx={{ mb: 3 }} textAlign={"center"} />

                    <FlexBox>
                        <Link to={""} className="button-link">
                            <RsButton text="No" />
                        </Link>

                        <Link to={""} className="button-link">
                            <RsButton text="Yes logout" />
                        </Link>
                    </FlexBox>
                </Paper>
            </Box>
        </MotionDivWrapper>
    </>
}