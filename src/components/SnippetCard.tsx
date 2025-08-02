import { Code, GitHub } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import type { Snippet } from "../types/userProfileTypes/Snippet";
import useSnippetFieldDistributor from "../distributers/useSnippetFieldDistributor";
import EditAction from "./EditAction";
import CodeBlock from "./CodeBlock";

interface SnippetCardProps {
    snippet: Snippet
}

export default function SnippetCard( {snippet}: SnippetCardProps) {
    const handleClickSave = (updatedData: any) => {
        console.log(updatedData);
    }

    return (
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
                        <Typography variant="h6">{snippet.title}</Typography>
                    </Box>
                    <EditAction
                        type="edit"
                        title={"Editing snipper" + snippet.title}
                        fields={useSnippetFieldDistributor(snippet.title, snippet.language, snippet.preview)}
                        handleClickSave={handleClickSave}
                    />
                </Box>
                <Chip
                    label={snippet.language}
                    size="small"
                    color="secondary"
                    sx={{ mb: 2 }}
                />
                <CodeBlock language={snippet.language} code={snippet.preview} />
            </CardContent>
            <CardActions>
                <Button size="small" startIcon={<GitHub />}>
                    View Git
                </Button>
            </CardActions>
        </Card>
    );
}
