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
import { useEffect, useRef, useState } from "react";
import ConvertToFormData from "../utils/ConvertToFormData";
import useUpdateCredentials from "../api/useUpdateCredentials";
import GlobalSnackbar from "./Snackbar";
import { useDispatch, useSelector } from "react-redux";
import useGetCredentials from "../api/useGetCredentials";
import { setUserInfo, setUserSkills } from "../slices/userSlice";
import type { RootState } from "../slices/store";
import type { UserInfo } from "../types/userProfileTypes/UserInfo";
import fileToBase64 from "../utils/fileToBase64";
import AddAction from "./AddAction";

export default function PersonalInfo() {
    const isSmall = useMediaQuery("(max-width: 440px)");
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user).userInfo;
    const userSkills = useSelector((state: RootState) => state.user).skills;

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
        
        const getUserSkills = async () => {
            const response = await useGetCredentials(
                "http://localhost:8080/api/v1/userSkills/getTechStack/"
            )

            if (response.status === "SUCCESS") {
                const data = response.data;
                console.log(data);
                dispatch(setUserSkills(data));
            }
        }

        getUserInfo();
        getUserSkills();
    }, []);

    const handleClickSave = async (updatedData: any) => {
        const response = await useUpdateCredentials(
            ConvertToFormData(updatedData),
            "http://localhost:8080/api/v1/profile/userInfo/"
        );

        const updatedUserInfo: UserInfo = {
            ...userInfo,
            profilePictureUrl: userInfo?.profilePictureUrl ?? "",
            about: updatedData.about,
            bio: updatedData.bio,
        };

        if (updatedData.profilePictureUrl !== null) {
            const base64Url = await fileToBase64(updatedData.profilePictureUrl);
            updatedUserInfo.profilePictureUrl = base64Url;
        }

        dispatch(setUserInfo(updatedUserInfo));

        setSnackbarState({ open: true, message: response.data });
    };

    const onAddedSkills = async (addedData: any) => {

        // const response = await useUpdateCredentials(
        //     ConvertToFormData(addedData),
        //     "http://localhost:8080//api/v1/userSkills/updateTechStack/"
        // );

        // const updatedUserSkills: Skill[] = addedData;
    }

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
                                {userInfo?.bio ?? "No bio yet."}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 2, maxWidth: 750 }}
                            >
                                {userInfo?.about ?? "No about section yet."}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                            Skills & Technologies
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            {userSkills?.map((skill) => (
                                <Chip
                                    key={skill.skillName}
                                    label={skill.skillName}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mb: 1 }}
                                />
                            )) ?? "This information is unavailable"}
                        </Stack>
                    </Box>
                </Box>

                <Box display={"flex"} gap={2}>
                    <AddAction
                        title={"Add skills"}
                        handleClickSave={onAddedSkills}
                        fields={[
                            {
                                type: "technology",
                                name: "techStack",
                                ref: useRef<HTMLInputElement>(null),
                                currValue: "",
                                values: userSkills?.map(
                                    (skill) => skill.skillName
                                ),
                            },
                        ]}
                    />

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
            </Box>
        </Paper>
    );
}
