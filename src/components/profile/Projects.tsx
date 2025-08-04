import { Grid, Typography, Box, useMediaQuery } from "@mui/material";
import EditAction from "./EditAction";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../slices/store";
import useAddCredentials from "../../api/useAddCredentials";
import { addProject } from "../../slices/userSlice";
import useSnackbar from "../../hooks/useSnackbar";
import GlobalSnackbar from "../Snackbar";
import { initialSnackbarState } from "../../constants/initialSnackbarState";
import ProjectCard from "./ProjectCard";
import { v4 as id } from 'uuid';
import ConvertToSkill from "../../utils/ConvertToSkill.";
import useProjectFieldDistributor from "../../distributers/useProjectFieldDistributer";

export default function Projects() {
    const isSmall = useMediaQuery("(max-width: 420px)");
    const projects = useSelector((state: RootState) => state.user).projects;
    const dispatch = useDispatch();
    const { isSnackbarOpen, setSnackbarState, snackbarMessage, snackbarSeverity } = useSnackbar();

    const handleAddProject = async (addedData: any) => {
        const response = await useAddCredentials(
            addedData,
            "http://localhost:8080/api/v1/profile/addProject/"
        );

        if (response.status === "SUCCESS") {
            const convertedSkills = ConvertToSkill(addedData.techStack);
            addedData.techStack = convertedSkills;
            addedData.id = response.data.id ?? id();

            dispatch(addProject(addedData));
            setSnackbarState({ open: true, message: response.data.message, severity: "success" });
        }
    };

    return (
        <>
            <GlobalSnackbar
                open={isSnackbarOpen}
                handleClose={() => setSnackbarState(initialSnackbarState)}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
            <Box mb={4}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={isSmall ? "start" : "center"}
                    flexDirection={isSmall ? "column" : "row"}
                    mb={2}
                >
                    <Typography variant="h4" component="h2" gutterBottom>
                        Featured Projects
                    </Typography>

                    <EditAction
                        type="add"
                        title="Add Project"
                        fields={useProjectFieldDistributor("", "", [])}
                        handleClickSave={handleAddProject}
                    />
                </Box>

                <Grid container spacing={3}>
                    {Array.isArray(projects) && projects.length > 0
                        ? projects.map((project) => (
                              <Grid size={{ xs: 12, md: 4 }} key={project.id}>
                                  <ProjectCard
                                      project={project}
                                      setSnackbarState={setSnackbarState}
                                  />
                              </Grid>
                          ))
                        : "No Project Information Avaliable"}
                </Grid>
            </Box>
        </>
    );
}
