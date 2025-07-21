import type { Project } from "../types/userProfileTypes/Project";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Launch, GitHub } from "@mui/icons-material";
import ProfileActions from "./ProfileActions";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const isSmall = useMediaQuery("(max-width: 420px)");

  return (
    <Box mb={4}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={isSmall ? "start" : "center"}
            flexDirection={isSmall ? "column" : "row"} mb={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Projects
        </Typography>
        <ProfileActions showAddIcon={true} />
      </Box>

      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "transparent",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
                <Box mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tech Stack:
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {project.techStack.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                </Box>
              </CardContent>
              <CardActions>
                {project.liveUrl &&
                    <Button
                        size="small"
                        startIcon={<Launch />}
                        href={project.liveUrl}
                        target="_blank">
                        Live Demo
                    </Button>
                }

                {project.repoUrl &&
                    <Button
                        size="small"
                        startIcon={<GitHub />}
                        href={project.repoUrl}
                        target="_blank">
                        GitHub
                    </Button>
                }
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
