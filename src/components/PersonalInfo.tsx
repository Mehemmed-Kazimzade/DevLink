import {
    Paper,
    Box,
    Avatar,
    Typography,
    Chip,
    Stack,
    useMediaQuery,
} from "@mui/material";
import RsTypography from "./ui/RsTypography";
import type { Skill } from "../types/userProfileTypes/Skill";
import EditAction from "./EditAction";
import type { Field } from "../types/formTypes/Field";
import { useEffect, useRef, useState } from "react";
import ConvertToFormData from "../utils/ConvertToFormData";
import useUpdateCredentials from "../api/useUpdateCredentials";
import GlobalSnackbar from "./Snackbar";
import { useDispatch, useSelector } from "react-redux";
import useGetCredentials from "../api/useGetCredentials";
import { setUserInfo } from "../slices/userSlice";
import type { RootState } from "../slices/store";
import type { UserInfo } from "../types/userProfileTypes/UserInfo";
import fileToBase64 from "../utils/fileToBase64";

interface BioProps {
    skills: Skill[];
}

export default function PersonalInfo({ skills }: BioProps) {
    const isSmall = useMediaQuery("(max-width: 440px)");
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user).userInfo;

    const initialSnackbarState = { open: false, message: "" };
    const [snackbarState, setSnackbarState] = useState(initialSnackbarState);

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await useGetCredentials(
                "http://localhost:8080/api/v1/profile/getUserInfo/"
            );

            if (response.status === "SUCCESS") {
                const data = response.data;
                dispatch(setUserInfo(data));
            }
        };

        getUserInfo();
    }, []);

    const handleClickSave = async (updatedData: any) => {
        const response = await useUpdateCredentials(
            ConvertToFormData(updatedData),
            "http://localhost:8080/api/v1/profile/userInfo/"
        );

        
        const updatedUserInfo: UserInfo = {
            profilePictureUrl: userInfo?.profilePictureUrl ?? "",
            about: updatedData.about,
            bio: updatedData.bio
        }

        if (updatedData.profilePictureUrl !== null) {
            console.log(updatedData.profilePictureUrl);
            const base64Url = await fileToBase64(updatedData.profilePictureUrl);
            updatedUserInfo.profilePictureUrl = base64Url;
        }

        dispatch(setUserInfo(updatedUserInfo));
        
        setSnackbarState({ open: true, message: response.data });
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: "transparent" }}>
            <GlobalSnackbar
                open={snackbarState.open}
                handleClose={() => {
                    setSnackbarState(initialSnackbarState);
                }}
                message={snackbarState.message}
            />
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                    <Box display="flex" flexDirection="column" gap={3} mb={3}>
                        <Box
                            display="flex"
                            gap={3}
                            alignItems={isSmall ? "start" : "center"}
                            flexDirection={isSmall ? "column" : "row"}
                        >
                            <Avatar
                                sx={{ width: 120, height: 120 }}
                                src={userInfo?.profilePictureUrl}
                                alt="Profile Avatar"
                            />

                            <RsTypography text="John Doe" xs="36px" lg="40px" />
                        </Box>

                        <Box flex={1} width="100%">
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
                                {userInfo?.bio}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 2, maxWidth: 750 }}
                            >
                                {userInfo?.about}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Skills & Technologies
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            {skills.map((skill) => (
                                <Chip
                                    key={skill.skillName}
                                    label={skill.skillName}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mb: 1 }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Box>

                <EditAction
                    handleClickSave={handleClickSave}
                    title="Editing Personal Info"
                    fields={[
                        {
                            type: "image",
                            name: "profilePictureUrl",
                            currValue: userInfo?.profilePictureUrl ?? "",
                            ref: useRef<HTMLInputElement>(null),
                        },
                        {
                            type: "text",
                            name: "bio",
                            currValue: userInfo?.bio ?? "",
                            ref: useRef<HTMLInputElement>(null),
                        },

                        {
                            type: "bigText",
                            name: "about",
                            currValue: userInfo?.about ?? "",
                            ref: useRef<HTMLTextAreaElement>(null),
                        },
                    ]}
                />
            </Box>
        </Paper>
    );
}
