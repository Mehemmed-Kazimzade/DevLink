import {
    Button,
    Divider,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import useAddCredentials from "../../api/useAddCredentials";
import ConvertToFormData from "../../utils/ConvertToFormData";
import type { SnackbarState } from "../../constants/initialSnackbarState";
import type { AnswerDto, UserDto } from "../../types/questions";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../slices/store";
import { addAnswerOnQuestion } from "../../slices/cachedQuestionSlice";

interface AddAnswerForm {
    content: string;
}

interface AddAnswerProps {
    questionId: number;
    setSnackbarState: (snackbarState: SnackbarState) => void;
}

export default function AddAnswer({questionId, setSnackbarState}: AddAnswerProps) {
    const theme = useTheme();
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<AddAnswerForm>();

    const dispatch = useDispatch<AppDispatch>();

    const onSave = async (form: AddAnswerForm) => {

        const sentForm = {...form, questionId: questionId}

        const response = await useAddCredentials<AnswerDto>(
            ConvertToFormData(sentForm), 
            "http://localhost:8080/api/v1/answer/postAnswer/"
        );
        
        if (response.status === "SUCCESS") {
            dispatch(addAnswerOnQuestion(response.data));

            setSnackbarState({open: true, message: "Answer added successfully", severity: "success" });
        }

        else{
            setSnackbarState({open: true, message: response.data.message, severity: "error" });
        }
    };

    return (
        <>
            <Stack gap={2} mt={3}>
                <Typography variant="h5">Post your answer</Typography>

                <Divider />

                <Controller
                    name="content"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Answer box cannot be empty" }}
                    render={({ field }) => (
                        <div data-color-mode={theme.palette.mode}>
                            <MDEditor
                                value={field.value}
                                onChange={(val: string | undefined) =>
                                    field.onChange(val ?? "")
                                }
                                textareaProps={{
                                    placeholder:
                                        "Include all the information someone would need to understand your answer",
                                }}
                            />
                        </div>
                    )}
                />

                {errors.content && (
                    <Typography color="error">
                        {errors.content.message}
                    </Typography>
                )}

                <Button
                    onClick={handleSubmit(onSave)}
                    variant="outlined"
                    sx={{ width: "fit-content" }}
                >
                    POST
                </Button>
            </Stack>
        </>
    );
}

