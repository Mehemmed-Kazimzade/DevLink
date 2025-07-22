import { Paper, Box, Avatar, Typography, Chip, Stack, useMediaQuery } from "@mui/material";
import RsTypography from "./ui/RsTypography";
import type { Skill } from "../types/userProfileTypes/Skill";
import ProfileActions from "./ProfileActions";
import type { Field } from "../types/formTypes/Field";
import React, { useRef } from "react";

interface BioProps {
    skills: Skill[],
}


export default function PersonalInfo({ skills }: BioProps) {
    
    const isSmall = useMediaQuery("(max-width: 440px)");

    const fields: Field[] = [
        {
            type: "image",
            currValue: "https://ui-avatars.com/api/?name=John+Doe",
            ref: useRef<HTMLInputElement>(null)
        },
        {
            type: "text",
            currValue: "Full Stack Developer & Software Engineer",
            ref: useRef<HTMLInputElement>(null)
        },

        {
            type: "bigText",
            currValue: "Passionate software engineer with 5+ years of experience building scalable web applications. I love creating efficient solutions and learning new technologies. Always excited to tackle challenging problems and collaborate with amazing teams.",
            ref: useRef<HTMLTextAreaElement>(null)
        }
    ]

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: "transparent" }}>
            <Box display={"flex"}  justifyContent={"space-between"}>
                <Box>
                    <Box display="flex" flexDirection="column" gap={3} mb={3}>
                        <Box
                            display="flex"
                            gap={3}
                            alignItems={isSmall ? "start" : "center"}
                            flexDirection={isSmall ? "column" : "row"}
                        >
                            <Avatar
                                sx={{ width: 120, height: 120 }}
                                src="/placeholder.svg?height=120&width=120"
                                alt="Profile Avatar"
                            />

                            <RsTypography text="John Doe" xs="36px" lg="40px" />
                        </Box>

                        <Box flex={1} width="100%">
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Full Stack Developer & Software Engineer
                            </Typography>
                            
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 2, maxWidth: 750 }}>
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
                                key={skill.skillName}
                                label={skill.skillName}
                                variant="outlined"
                                color="primary"
                                sx={{ mb: 1 }}
                            />
                            ))}
                        </Stack>
                    </Box>
                </Box>

                <ProfileActions showAddIcon={false} fields={fields} title="Editing Personal Info" />
            </Box>
        </Paper>
    )
};
