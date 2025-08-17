import { Avatar, Box, Button, IconButton, Paper, Popover, Stack, Typography, useMediaQuery } from "@mui/material";
import type { AnswerDto } from "../../types/questions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from '@mui/icons-material/Delete';
import { Check, Flag, Share, ThumbDown, ThumbUp } from "@mui/icons-material";
import MarkdownViewer from "../profile/MarkdownViewer";
import FindDateDifference from "../../utils/FindDateDifference";
import usePopover from "../../hooks/usePopover";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../slices/store";
import useDeleteCredentials from "../../api/useDeleteCredentials";
import type { SnackbarState } from "../../constants/initialSnackbarState";
import { deleteAnswerOnQuestion } from "../../slices/cachedQuestionSlice";

interface AnswerItemProps {
    answer: AnswerDto;
    setSnackbarState: (snackbarState: SnackbarState) => void;
}

export default function AnswerItem({ answer, setSnackbarState }: AnswerItemProps ) {
    const {handleClick, open, anchorEl, handleClose} = usePopover();
    const isSmall = useMediaQuery("(max-width:507px)");
    const id = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();

    const handleDelete = async (answerId: number) => {
        const response = await useDeleteCredentials(`http://localhost:8080/api/v1/answer/deleteAnswer/${answerId}`);

        if (response.status === "SUCCESS") {
            dispatch(deleteAnswerOnQuestion(answerId));
            setSnackbarState({ severity: "success", open: true, message: "Answer was deleted" });
        }

        else {
            setSnackbarState({ severity: "error", open: true, message: "Unable to delete, try to refresh."  })
        }
    }

    return (
        <Paper
            key={answer.id}
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderLeft: answer.isAccepted ? "4px solid" : "1px solid",
                borderLeftColor: answer.isAccepted ? "success.main" : "divider",
            }}
        >
            <Box display={"flex"} justifyContent={"space-between"} 
                sx={{border: "1px solid", borderColor: "divider", borderRadius: 1, mb: 3, p: 2}}>
                <Box>
                    <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, color: "text.secondary" }}
                    >
                        Answered by
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            src={answer.user.profileImageUrl}
                            alt={answer.user.fullName}
                            sx={{ width: 32, height: 32 }}
                        />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {answer.user.fullName}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                            >
                                Answered {FindDateDifference(new Date(answer.createdAt).getTime())}
                                {answer.updatedAt &&
                                    ` • Edited ${FindDateDifference(new Date(answer.updatedAt).getTime())}`}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                {id === answer.user.id && <Box>
                    <IconButton onClick={handleClick}>
                        <MoreHorizIcon  />
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{vertical: "bottom",horizontal: "left"}}>
                            <Button onClick={() => handleDelete(answer.id)} variant="outlined" sx={{ p: 1 }}>
                                <DeleteIcon />
                                Delete
                            </Button>
                    </Popover>
                </Box>}
            </Box>

            <Box sx={{ display: "flex", flexDirection: isSmall ? "column" : "row", gap: 3 }}>
                {/* Answer Vote Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isSmall ? "row" : "column",
                        alignItems: "center",
                        minWidth: 60,
                    }}
                >
                    <IconButton size="large" sx={{ color: "text.secondary" }}>
                        <ThumbUp />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600, my: 1 }}>
                        {answer.upVotes}
                    </Typography>
                    <IconButton size="large" sx={{ color: "text.secondary" }}>
                        <ThumbDown />
                    </IconButton>
                    {answer.isAccepted && (
                        <Box sx={{ mt: 2, color: "success.main" }}>
                            <Check fontSize="large" />
                        </Box>
                    )}
                </Box>

                {/* Answer Content */}
                <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} sx={{ flex: 1 }}>
                    <MarkdownViewer content={answer.content} />

                    {/* Answer Actions */}
                    <Stack direction="row" spacing={2} mt={3}>
                        <Button
                            startIcon={<Share />}
                            size="small"
                            color="inherit"
                        >
                            Share
                        </Button>
                        <Button
                            startIcon={<Flag />}
                            size="small"
                            color="inherit"
                        >
                            Flag
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
}
