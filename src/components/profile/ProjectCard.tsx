import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import EditAction from "./EditAction";
import type { Project } from "../../types/userProfileTypes/Project";
import { GitHub, Launch } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { sx } from "../../constants/SxForIcons";
import YesOrNoDialog from "../YesOrNoDialog";
import { useState } from "react";
import useDeleteCredentials from "../../api/useDeleteCredentials";
import { useDispatch } from "react-redux";
import { deleteProject, updateProject } from "../../slices/userSlice";
import type { SnackbarState } from "../../constants/initialSnackbarState";
import useUpdateCredentials from "../../api/useUpdateCredentials";
import ConvertToFormData from "../../utils/ConvertToFormData";
import ConvertToSkill from "../../utils/ConvertToSkill.";
import { sxForWordBreaking } from "../../constants/SxForWordBreaking";
import useProjectFieldDistributor from "../../distributers/useProjectFieldDistributer";

interface ProjectCardProps {
    project: Project;
    setSnackbarState: (snackbarState: SnackbarState) => void;
}

export default function ProjectCard({
    project,
    setSnackbarState,
}: ProjectCardProps) {
    const fields = useProjectFieldDistributor(
        project.title,
        project.description,
        project.techStack.map((skill) => skill.skillName)
    );

    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const onUpdate = async (updatedData: any, id: number) => {
        const response = await useUpdateCredentials(
            ConvertToFormData(updatedData),
            "http://localhost:8080/api/v1/profile/updateProject/"
        );

        if (response.status === "SUCCESS") {
            updatedData.id = id;
            updatedData.techStack = ConvertToSkill(updatedData.techStack);

            dispatch(updateProject(updatedData));
            setSnackbarState({
                open: true,
                message: `Project ${updatedData.title} updated.`,
                severity: "success",
            });
        } else {
            setSnackbarState({
                open: true,
                message: response.data,
                severity: "success",
            });
        }
    };

    const onDelete = async (hasClickedYes: boolean, id: number) => {
        if (hasClickedYes) {
            const response = await useDeleteCredentials(
                `http://localhost:8080/api/v1/profile/deleteProject/${id}`
            );

            if (response.status === "SUCCESS") {
                setSnackbarState({
                    open: true,
                    message: response.data.message,
                    severity: "success",
                });

                dispatch(deleteProject(id));
            } else {
                setSnackbarState({
                    open: true,
                    message: response.data,
                    severity: "error",
                });
            }
        }

        setDialogOpen(false);
    };

    return (
        <>
            <YesOrNoDialog
                title="Are you sure you want to delete this project"
                text="This action cannot be undone"
                isDialogOpen={dialogOpen}
                onClose={(hasClickedYes: boolean) =>
                    onDelete(hasClickedYes, project.id)
                }
            />

            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "transparent",
                }}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography
                            sx={sxForWordBreaking}
                            variant="h6"
                            fontWeight={"bold"}
                            gutterBottom
                        >
                            {project.title}
                        </Typography>
                        <Box display={"flex"} gap={2}>
                            <EditAction
                                type="edit"
                                title={"Editing project: " + project.title}
                                fields={fields}
                                handleClickSave={(updatedData: any) =>
                                    onUpdate(updatedData, project.id)
                                }
                            />
                            <DeleteIcon
                                onClick={() => setDialogOpen(true)}
                                sx={sx}
                            />
                        </Box>
                    </Box>
                    <Typography
                        sx={sxForWordBreaking}
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                    >
                        {project.description}
                    </Typography>
                    <Box mt={2} mb={2}>
                        <Typography
                            variant="body1"
                            fontWeight={"bold"}
                            gutterBottom
                        >
                            Tech Stack:
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            useFlexGap
                        >
                            {project.techStack.map((tech) => (
                                <Chip
                                    key={tech.skillName}
                                    label={tech.skillName}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mb: 0.5 }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </CardContent>
                <CardActions>
                    {project.liveUrl && (
                        <Button
                            size="small"
                            startIcon={<Launch />}
                            href={project.liveUrl}
                            target="_blank"
                        >
                            Live Demo
                        </Button>
                    )}

                    {project.repoUrl && (
                        <Button
                            size="small"
                            startIcon={<GitHub />}
                            href={project.repoUrl}
                            target="_blank"
                        >
                            GitHub
                        </Button>
                    )}
                </CardActions>
            </Card>
        </>
    );
}
