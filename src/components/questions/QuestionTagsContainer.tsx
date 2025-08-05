import { Box, Chip, Stack } from "@mui/material";

interface QuestionTagsContainerProps {
    questionTags: string[];
}

export default function QuestionTagsContainer({
    questionTags,
}: QuestionTagsContainerProps) {
    return (
        <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {questionTags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        sx={{
                            bgcolor: "#e3f2fd",
                            borderColor: "#90caf9",
                            color: "#1565c0",
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
}
