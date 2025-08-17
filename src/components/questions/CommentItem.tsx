import {
    Avatar,
    Box,
    Button,
    Divider,
    IconButton,
    Popover,
    Typography,
} from "@mui/material";
import type { CommentDto } from "../../types/questions";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices/store";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import usePopover from "../../hooks/usePopover";

interface CommentItemProps {
    comment: CommentDto;
}

export default function CommentItem({ comment }: CommentItemProps) {
    const {handleClick, open, anchorEl, handleClose} = usePopover();
    const id = useSelector((state: RootState) => state.user.id);

    return (
        <Box marginBlock={2} borderRadius={2} paddingBlock={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Avatar
                        src={comment.user?.profileImageUrl}
                        alt={comment.user?.fullName}
                        sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {comment.user?.fullName}
                    </Typography>
                </Box>

                {id === comment.user?.id && 
                    <>
                    <IconButton onClick={handleClick}>
                        <MoreHorizIcon  />
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{vertical: "bottom",horizontal: "left"}}>
                            <Button variant="outlined" sx={{ p: 1 }}>
                                <DeleteIcon />
                                Delete
                            </Button>
                    </Popover>
                </>}
            </Box>

            <Divider sx={{ marginBlock: 2 }} />

            <Typography variant="body2">{comment.content}</Typography>
        </Box>
    );
}
