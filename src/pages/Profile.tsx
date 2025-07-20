"use client";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { GitHub, Launch, Code, EmojiEvents, School } from "@mui/icons-material";
import CodeBlock from "../components/CodeBlock";
import RsTypography from "../components/ui/RsTypography";

export default function Profile() {
  const isSmall = useMediaQuery("(max-width: 440px)");

  const skills = [
    "React",
    "Java",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration and admin dashboard.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates and team features.",
      techStack: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather dashboard with data visualization and location-based forecasts.",
      techStack: ["React", "D3.js", "OpenWeather API", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const snippets = [
    {
      title: "React Custom Hook",
      language: "JavaScript",
      preview:
        "const useLocalStorage = (key, initialValue) => {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n  ...",
    },
    {
      title: "Binary Search Algorithm",
      language: "Python",
      preview:
        "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1",
    },
    {
      title: "API Rate Limiter",
      language: "Node.js",
      preview:
        'const rateLimit = require("express-rate-limit");\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // limit each IP to 100 requests per windowMs\n  message: "Too many requests from this IP"\n});\n\napp.use(limiter);',
    },
  ];

  const achievements = [
    { title: "AWS Certified Solutions Architect", icon: <School /> },
    { title: "LeetCode Top 5%", icon: <EmojiEvents /> },
    { title: "Google Cloud Professional", icon: <School /> },
    { title: "HackerRank 5 Star Java", icon: <EmojiEvents /> },
    { title: "Certified Kubernetes Administrator", icon: <School /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: "transparent" }}>
        <Box display="flex" flexDirection={"column"} gap={3} mb={3}>
          <Box display={"flex"} gap={3} alignItems={isSmall ? "start" : "center"} 
              flexDirection={isSmall ? "column" : "row"}>
            <Avatar
              sx={{ width: 120, height: 120 }}
              src="/placeholder.svg?height=120&width=120"
              alt="Profile Avatar"
            />
            <RsTypography text={"John Doe"} xs={"36px"} lg={"40px"} />
          </Box>

          <Box flex={1} width={"90%"}>
            <Typography variant="h5" fontWeight={"bold"} gutterBottom>
              Full Stack Developer & Software Engineer
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: 750 }}
            >
              Passionate software engineer with 5+ years of experience building
              scalable web applications. I love creating efficient solutions and
              learning new technologies. Always excited to tackle challenging
              problems and collaborate with amazing teams.
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Skills & Technologies
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                variant="outlined"
                color="primary"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>
      </Paper>

      {/* Projects Section */}
      <Box mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Projects
        </Typography>
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
                  <Typography variant="h6" component="h3" gutterBottom>
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
                  <Button
                    size="small"
                    startIcon={<Launch />}
                    href={project.liveUrl}
                    target="_blank"
                  >
                    Live Demo
                  </Button>
                  <Button
                    size="small"
                    startIcon={<GitHub />}
                    href={project.githubUrl}
                    target="_blank"
                  >
                    GitHub
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snippets Section */}
      <Box mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Code Snippets & Gists
        </Typography>
        <Grid container spacing={3}>
          {snippets.map((snippet, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ height: "100%", bgcolor: "transparent"}}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Code color="primary" />
                    <Typography variant="h6" component="h3">
                      {snippet.title}
                    </Typography>
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
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Achievements Section */}
      <Paper elevation={3} sx={{ p: 4, bgcolor: "transparent" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Achievements & Certifications
        </Typography>
        <Grid container spacing={2}>
          {achievements.map((achievement, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  {achievement.icon}
                  <Typography variant="body1" fontWeight="medium">
                    {achievement.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
