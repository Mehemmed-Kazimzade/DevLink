import {
    Grid,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    useMediaQuery,
} from "@mui/material";
import { Code, GitHub } from "@mui/icons-material";
import CodeBlock from "./CodeBlock";
import type { Snippet } from "../types/userProfileTypes/Snippet";
import ProfileActions from "./EditAction";
import EditAction from "./EditAction";
import { useRef } from "react";

interface SnippetsProps {
    snippets: Snippet[];
}

export default function Snippets({ snippets }: SnippetsProps) {
    const isSmall = useMediaQuery("(max-width: 420px)");

    return (
        <Box mb={4}>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={isSmall ? "start" : "center"}
                flexDirection={isSmall ? "column" : "row"}
                mb={2}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Code Snippets & Gists
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {snippets.map((snippet, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                        <Card sx={{ height: "100%", bgcolor: "transparent" }}>
                            <CardContent>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent={"space-between"}
                                    mb={2}
                                >
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <Code color="primary" />
                                        <Typography variant="h6">
                                            {snippet.title}
                                        </Typography>
                                    </Box>
                                    <EditAction
                                        title={
                                            "Editing snipper" + snippet.title
                                        }
                                        fields={[
                                            {
                                                type: "text",
                                                currValue: snippet.title,
                                                ref: useRef<HTMLInputElement>(
                                                    null
                                                ),
                                            },
                                            {
                                                type: "bigText",
                                                currValue: snippet.preview,
                                                ref: useRef<HTMLTextAreaElement>(
                                                    null
                                                ),
                                            },
                                        ]}
                                    />
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
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
