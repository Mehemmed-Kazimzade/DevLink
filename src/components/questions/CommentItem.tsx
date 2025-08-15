import { Avatar, Box, Divider, Typography } from "@mui/material";
import type { CommentDto } from "../../types/questions";

interface CommentItemProps {
    comment: CommentDto;
}

export default function CommentItem({ comment }: CommentItemProps) {
    return (
        <Box marginBlock={2} borderRadius={2} paddingBlock={2}>
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

            <Divider sx={{ marginBlock: 2 }} />

            <Typography variant="body2">
                {comment.content}
            </Typography>

        </Box>
    );
}
