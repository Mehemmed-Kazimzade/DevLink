import { Box, Chip, Stack, useTheme } from "@mui/material";

interface QuestionTagsContainerProps {
    tags: string[];
    deleteTag: (tagName: string) => void;
}

export default function QuestionTagsContainer({
    tags,
    deleteTag,
}: QuestionTagsContainerProps) {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        variant="outlined"
                        onDelete={() => deleteTag(tag)}
                        sx={{
                            fontWeight: "bold",
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
}
