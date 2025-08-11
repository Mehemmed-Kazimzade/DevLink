import {
    Button,
    Tooltip,
    Card,
    CardContent,
    Box,
    Typography,
    Stack,
    Divider,
    Alert,
    IconButton,
    TextField,
    useMediaQuery,
} from "@mui/material";

import {
    Help,
    Add,
} from "@mui/icons-material";
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { Controller, useForm } from "react-hook-form";
import { type QuestionPostForm } from "../../types/questions/PostOperations";
import QuestionTagsContainer from "./QuestionTagsContainer";
import useAddCredentials from "../../api/useAddCredentials";
import ConvertToFormData from "../../utils/ConvertToFormData";
import useSnackbar from "../../hooks/useSnackbar";
import GlobalSnackbar from "../Snackbar";
import { initialSnackbarState } from "../../constants/initialSnackbarState";
import { redirect } from "react-router-dom";

export default function QuestionPost() {
    const isSmall = useMediaQuery("(max-width: 500px)");
    const [tagInput, setTagInput] = useState<string>("");

    const {register, handleSubmit, control, formState: { errors }} = useForm<QuestionPostForm>();
    const {snackbarMessage, setSnackbarState, snackbarSeverity, isSnackbarOpen} = useSnackbar();

    const onSave = async (questionPostFormData: QuestionPostForm) => {
        const response = await useAddCredentials(
            ConvertToFormData(questionPostFormData),
            "http://localhost:8080/api/v1/question/postQuestion/"
        );

        if (response.status === "SUCCESS") {
            setSnackbarState({ open: true, message: response.data.message, severity:"success"  });
            redirect("/QA/questions/");
        }

        else {
            setSnackbarState({ open: true, message: response.data, severity:"error"  });
        }
    }

    return <>
        <GlobalSnackbar
            open={isSnackbarOpen}
            severity={snackbarSeverity}
            message={snackbarMessage}
            handleClose={() => setSnackbarState(initialSnackbarState)}
        />
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
            <form onSubmit={handleSubmit(onSave)}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ mb: 1, fontWeight: 600 }}
                    >
                        Ask a Question
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Get help from the community by asking a clear, detailed
                        question
                    </Typography>
                </Box>

                <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                        <strong>Writing a good question:</strong> Be specific,
                        include relevant details, show what you've tried, and make
                        it easy for others to understand your problem.
                    </Typography>
                </Alert>

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Stack spacing={4}>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2,}}>
                                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                                        Title
                                    </Typography>
                                    <Tooltip title="Be specific and imagine you're asking a question to another person">
                                        <IconButton size="small" sx={{ ml: 1 }}>
                                            <Help fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <TextField
                                    {...register("questionTitle", {
                                        minLength: {value: 10, message: "Title must be at least 10 characters long"},
                                        required: "Title cannot be empty"
                                    })}
                                    fullWidth
                                    placeholder="e.g. How to implement authentication in React with TypeScript?"
                                    helperText="Be specific and imagine you're asking a question to another person"/>
                                    {
                                        <Typography sx={{ ml: 1.7 }} fontSize="small" color="error">
                                            {errors.questionTitle?.message}
                                        </Typography>
                                    }
                            </Box>
                            

                            <Divider />

                            <Box>
                                <Box sx={{display: "flex",alignItems: "center",justifyContent: "space-between",mb: 2,}}>
                                    <Box sx={{display: "flex",alignItems: "center",}}>
                                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                                            Body
                                        </Typography>

                                        <Tooltip title="Include all the information someone would need to answer your question">
                                            <IconButton size="small" sx={{ ml: 1 }}>
                                                <Help fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                    </Box>
                                </Box>

                                <Controller 
                                    name="questionBody"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Question body cannot be empty" }}
                                    render={({ field }) => (
                                        <MDEditor
                                            textareaProps={{placeholder: "Include all the information someone would need to answer your question"}}
                                            value={field.value}
                                            onChange={(val: string | undefined) => field.onChange(val ?? "")}
                                        />
                                    )}
                                />

                                <Typography sx={{ mt: 1.7 }} fontSize="small" color="error">
                                    {errors.questionBody?.message}
                                </Typography>

                            </Box>

                            <Divider />

                            <Box>
                                <Box sx={{display: "flex",alignItems: "center",mb: 2,}}>
                                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                                        Tags
                                    </Typography>
                                    <Tooltip title="Add up to 5 tags to describe what your question is about">
                                        <IconButton size="small" sx={{ ml: 1 }}>
                                            <Help fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                                <Controller 
                                    name="tags"
                                    control={control}
                                    defaultValue={[]}
                                    rules={{ validate: val => val.length > 0 || "Include at least one tag"}}
                                    render={({ field }) => (
                                        <>
                                        <Box sx={{ display: "flex", gap: isSmall ? 2 : 1, mb: 2,
                                            flexDirection: isSmall ? "column" : "row" }}>

                                            <TextField placeholder="e.g. react, typescript, authentication"
                                                size="small"
                                                sx={{ flex: 1 }}
                                                value={tagInput}
                                                onChange={e => setTagInput(e.target.value)}
                                                disabled={field.value.length >= 5}
                                                helperText={"Tag must be 2-25 chars"}
                                            />

                                            <Button variant="outlined" startIcon={<Add />}
                                                    sx={{ mb: 2 }}
                                                    disabled={
                                                        !tagInput.trim() || 
                                                        field.value.length >= 5 || 
                                                        tagInput.length < 2 ||
                                                        tagInput.length > 25 ||
                                                        field.value.some(tag => tag === tagInput)
                                                    }

                                                    onClick={() => {
                                                        const newTag = tagInput.trim();
                                                        if (newTag) {
                                                            field.onChange([...field.value, newTag]);
                                                            setTagInput("");} 
                                                    }}>
                                                Add Tag
                                            </Button>
                                        </Box>

                                        <QuestionTagsContainer tags={field.value}
                                            deleteTag={(tagName: string) => {
                                                field.onChange(field.value.filter(tag => tag !== tagName));
                                            }}/>

                                        <Typography variant="body2" color="text.secondary">
                                            Add up to 5 tags to describe what your question
                                            is about ({field.value.length}/5)
                                        </Typography>

                                        <Typography fontSize="small" color="error">
                                            {errors.tags?.message}
                                        </Typography>
                                        </>
                                    )}
                                />
                            </Box>

                            <Divider />

                            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end",}}>
                                <Button variant="outlined" size="large" sx={{ minWidth: 120 }}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" size="large" sx={{ minWidth: 120 }}>
                                    Post Question
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <Card sx={{ mt: 3}}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Tips for asking a great question
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                • Make your title specific and descriptive
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Explain what you've already tried and what didn't
                                work
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Include relevant code, error messages, or
                                screenshots
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Use proper formatting to make your question easy
                                to read
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                • Add relevant tags to help others find and answer
                                your question
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </form>
        </Box>
    </>;
}
