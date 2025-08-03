import { Code, GitHub } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Typography,
} from "@mui/material";
import type { Snippet } from "../types/userProfileTypes/Snippet";
import useSnippetFieldDistributor from "../distributers/useSnippetFieldDistributor";
import EditAction from "./EditAction";
import CodeBlock from "./CodeBlock";
import useAddCredentials from "../api/useAddCredentials";
import ConvertToFormData from "../utils/ConvertToFormData";
import { useDispatch } from "react-redux";
import { deleteSnippet, updateSnippet } from "../slices/userSlice";
import type { SnackbarState } from "../constants/initialSnackbarState";
import useDeleteCredentials from "../api/useDeleteCredentials";
import YesOrNoDialog from "./YesOrNoDialog";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { sx } from "../constants/SxForIcons";
import useUpdateCredentials from "../api/useUpdateCredentials";

interface SnippetCardProps {
    snippet: Snippet;
    setSnackbarState: (snackbarState: SnackbarState) => void;
}

export default function SnippetCard({
    snippet,
    setSnackbarState,
}: SnippetCardProps) {
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleClickSave = async (updatedData: any) => {
        updatedData.id = snippet.id;
        const response = await useUpdateCredentials(
            ConvertToFormData(updatedData),
            "http://localhost:8080/api/v1/snippet/updateSnippet/"
        );

        if (response.status === "SUCCESS") {
            dispatch(updateSnippet(updatedData));
            setSnackbarState({
                open: true,
                message: `Snippet ${updatedData.title} was updated!`,
                severity: "success",
            });
        } else {
            setSnackbarState({
                open: true,
                message: response.data,
                severity: "error",
            });
        }
    };

    const onDelete = async (hasClickedYes: boolean) => {
        if (hasClickedYes) {
            const response = await useDeleteCredentials(
                `http://localhost:8080/api/v1/snippet/deleteSnippet/${snippet.id}`
            );

            if (response.status === "SUCCESS") {
                dispatch(deleteSnippet(snippet.id));

                setSnackbarState({
                    open: true,
                    message: `Sippet ${snippet.title} was deleted!`,
                    severity: "success",
                });
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
                title="Are you sure you want to delete this snippet."
                text="This action cannot be undone."
                isDialogOpen={dialogOpen}
                onClose={onDelete}
            />
            <Card sx={{ height: "100%", bgcolor: "transparent" }}>
                <CardContent>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={"space-between"}
                        mb={2}
                    >
                        <Box display="flex" alignItems="center" gap={1}>
                            <Code color="primary" />
                            <Typography variant="h6">
                                {snippet.title}
                            </Typography>
                        </Box>
                        <Box display={"flex"} gap={2}>
                            <EditAction
                                type="edit"
                                title={"Editing snippet " + snippet.title}
                                fields={useSnippetFieldDistributor(
                                    snippet.title,
                                    snippet.language,
                                    snippet.preview
                                )}
                                handleClickSave={handleClickSave}
                            />
                            <DeleteIcon
                                onClick={() => setDialogOpen(true)}
                                sx={sx}
                            />
                        </Box>
                    </Box>
                    <Chip
                        label={snippet.language}
                        size="small"
                        color="secondary"
                        sx={{ mb: 2 }}
                    />
                    <CodeBlock
                        language={snippet.language}
                        code={snippet.preview}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" startIcon={<GitHub />}>
                        View Git
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
