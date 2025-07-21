import {
  Grid,
  Typography,
  Card,
  Box,
  Paper,
  useMediaQuery
} from "@mui/material";
import type { Certification } from "../types/userProfileTypes/Certification";
import ProfileActions from "./ProfileActions";

interface CertificationsProps {
    certifications: Certification[],
}

export default function Certifications({ certifications }: CertificationsProps) {
    const isSmall = useMediaQuery("(max-width: 420px)");

    return (
        <Paper elevation={3} sx={{ p: 4, bgcolor: "transparent" }}>
            <Box>
                <Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={isSmall ? "start" : "center"}
                            flexDirection={isSmall ? "column" : "row"} mb={2}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Achievements & Certifications
                        </Typography>
                        <ProfileActions showAddIcon={true} />
                    </Box>

                    <Grid container spacing={2}>
                        {certifications.map((certification, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={1}
                                >

                                {certification.icon}

                                <Typography variant="body1" fontWeight="medium">
                                    {certification.title}
                                </Typography>
                                </Box>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}