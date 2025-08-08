import {
    Paper,
    Box,
    Avatar,
    Typography,
    Chip,
    Stack,
    useMediaQuery,
} from "@mui/material";
import RsTypography from "../ui/RsTypography";
import EditAction from "./EditAction";
import { useRef } from "react";
import ConvertToFormData from "../../utils/ConvertToFormData";
import useUpdateCredentials from "../../api/useUpdateCredentials";
import GlobalSnackbar from "../Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setUserSkills } from "../../slices/userSlice";
import type { RootState } from "../../slices/store";
import type { UserInfo } from "../../types/userProfileTypes/UserInfo";
import fileToBase64 from "../../utils/fileToBase64";
import ConvertToSkill from "../../utils/ConvertToSkill.";
import useSnackbar from "../../hooks/useSnackbar";
import { initialSnackbarState } from "../../constants/initialSnackbarState";

export default function PersonalInfo() {
    const isSmall = useMediaQuery("(max-width: 440px)");
    const dispatch = useDispatch();
    const fullName = useSelector((state: RootState) => state.user.fullName);
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const userSkills = useSelector((state: RootState) => state.user.skills);

    const { isSnackbarOpen, setSnackbarState, snackbarMessage, snackbarSeverity } = useSnackbar();

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

        setSnackbarState({ open: true, message: response.data, severity: "success" });
    };

    const onAddedSkills = async (addedData: any) => {
        const response = await useUpdateCredentials(
            ConvertToFormData(addedData),
            "http://localhost:8080/api/v1/userSkills/updateTechStack/"
        );

        const convertedSkills = ConvertToSkill(addedData.techStack);

        dispatch(setUserSkills(convertedSkills));
        setSnackbarState({ open: true, message: response.data, severity: "success" });
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: "transparent" }}>
            <GlobalSnackbar
                open={isSnackbarOpen}
                handleClose={() => {
                    setSnackbarState(initialSnackbarState);
                }}
                message={snackbarMessage}
                severity={snackbarSeverity}
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

                            <RsTypography text={fullName} xs="36px" lg="40px" />
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
                        <Typography
                            variant="h6"
                            gutterBottom
                            fontWeight={"bold"}
                        >
                            Skills & Technologies
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            {!userSkills ||
                            (Array.isArray(userSkills) &&
                                userSkills.length === 0)
                                ? "No skills were added"
                                : userSkills.map((skill, idx) => (
                                      <Chip
                                          key={idx}
                                          label={skill.skillName}
                                          variant="outlined"
                                          color="primary"
                                          sx={{ mb: 1 }}
                                      />
                                  ))}
                        </Stack>
                    </Box>
                </Box>

                <Box display={"flex"} gap={2}>
                    <EditAction
                        type="add"
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
                        type="edit"
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
