import { Box, Paper} from "@mui/material";
import RsTypography from "../../components/ui/RsTypography";
import RsButton from "../../components/ui/RsButton";
import { Link, useNavigate } from "react-router-dom";
import FlexBox from "../../components/ui/FlexBox";
import MotionDivWrapper from "../../components/MotionDivWrapper";
import logout from "../../api/logout";
import { useDispatch } from "react-redux";
import { clearProfile } from "../../slices/userSlice";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const token = localStorage.getItem("token") ?? "";
        await logout("http://localhost:8080/api/v1/auth/logout/", token);
        localStorage.removeItem("token");
        dispatch(clearProfile());
        navigate("/logoutSuccess/");
    }

    return <>
        <MotionDivWrapper>
            <Box className="centered-container">
                <Paper className="paper">
                    <RsTypography lg="34px" xs="24px" fontWeight="bold" text="Are you sure you want to logout" 
                    sx={{ mb: 3 }} textAlign={"center"} />

                    <FlexBox>
                        <Link to={""} className="button-link">
                            <RsButton text="No, go back to Home page" />
                        </Link>

                        <RsButton onClick={handleLogout} text="Yes logout" />
                    </FlexBox>
                </Paper>
            </Box>
        </MotionDivWrapper>
    </>
}