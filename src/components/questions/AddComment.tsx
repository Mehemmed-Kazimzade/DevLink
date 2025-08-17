import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useAddCredentials from "../../api/useAddCredentials";
import type { SnackbarState } from "../../constants/initialSnackbarState";
import ConvertToFormData from "../../utils/ConvertToFormData";
import { useDispatch } from "react-redux";
import { setCommentsOnQuestion } from "../../slices/cachedQuestionSlice";
import type { UserDto } from "../../types/questions";
import type { ProfileResponse } from "../../types/userProfileTypes/ProfileResponse";

interface AddCommentForm {
    content: string;
}

interface AddCommentProps {
    questionId: number;
    setSnackbarState: (snackbarState: SnackbarState) => void;
    user: UserDto;
}

export default function AddComment({questionId, setSnackbarState, user}: AddCommentProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<AddCommentForm>();
    const dispatch = useDispatch();

    const onValid = async (form: AddCommentForm) => {
        const sentForm = {...form, questionId: questionId }

        const response = await useAddCredentials<ProfileResponse>(
            ConvertToFormData(sentForm), 
            "http://localhost:8080/api/v1/questions/postCommentOnQuestion/"
        );
        
        if (response.status === "SUCCESS") {
            dispatch(setCommentsOnQuestion({id: response.data.id ?? 0, content: form.content, user: user }));
            setSnackbarState({open: true, message: response.data.message, severity: "success" });
        }
        else{
            setSnackbarState({open: true, message: response.data.message, severity: "error" });
        }
    }

    return (
        <>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                Add a comment
            </Typography>

            <TextField
                {...register("content", {
                    required: "Content cannot be empty",
                    minLength: { value: 10, message: "Content must be at least 10 chars" }
                })}
                multiline
                rows={3}
                fullWidth
                placeholder="Use comments to ask for more information or suggest improvements. Avoid answering questions in comments."
                variant="outlined"
                sx={{ mb: 2 }}
            />
            { errors.content && <Typography color="error" gutterBottom> {errors.content.message} </Typography> }

            <Button variant="outlined" size="small" onClick={handleSubmit(onValid)}>
                Add Comment
            </Button>

        </>
    );
}
