import { Grid, Typography, Box, useMediaQuery } from "@mui/material";
import EditAction from "./EditAction";
import useSnippetFieldDistributor from "../../distributers/useSnippetFieldDistributor";
import SnippetCard from "./SnippetCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../slices/store";
import useAddCredentials from "../../api/useAddCredentials";
import ConvertToFormData from "../../utils/ConvertToFormData";
import { v4 as id } from "uuid";
import useSnackbar from "../../hooks/useSnackbar";
import { addSnippet } from "../../slices/userSlice";
import GlobalSnackbar from "../Snackbar";
import { initialSnackbarState } from "../../constants/initialSnackbarState";
import type { ProfileResponse } from "../../types/userProfileTypes/ProfileResponse";

export default function Snippets({isCurrentUser}: {isCurrentUser: boolean}) {
    const isSmall = useMediaQuery("(max-width: 420px)");
    const snippets = useSelector((state: RootState) => isCurrentUser ? state.user.snippets : state.viewedUser.snippets);
    const dispatch = useDispatch();
    const {
        isSnackbarOpen,
        setSnackbarState,
        snackbarMessage,
        snackbarSeverity,
    } = useSnackbar();

    const handleAddSnippet = async (addedData: any) => {
        const response = await useAddCredentials<ProfileResponse>(
            ConvertToFormData(addedData),
            "http://localhost:8080/api/v1/snippet/addSnippet/"
        );

        if (response.status === "SUCCESS") {
            addedData.id = response.data.id ?? id();
            dispatch(addSnippet(addedData));

            setSnackbarState({ open: true, severity: "success", message: response.data.message });
        }
    };

    return (
        <>
            <GlobalSnackbar
                open={isSnackbarOpen}
                severity={snackbarSeverity}
                message={snackbarMessage}
                handleClose={() => setSnackbarState(initialSnackbarState)}
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
                        Code Snippets & Gists
                    </Typography>

                    <Box display={isCurrentUser ? "block" : "none"}>
                        <EditAction
                            type="add"
                            title="Add Snippet"
                            fields={useSnippetFieldDistributor("", "", "")}
                            handleClickSave={handleAddSnippet}
                        />
                    </Box>
                </Box>
                <Grid container spacing={3}>
                    {Array.isArray(snippets) && snippets.length !== 0
                        ? snippets.map((snippet, index) => (
                              <Grid size={{ xs: 12, md: 6 }} key={index}>
                                  <SnippetCard isCurrentUser={isCurrentUser} snippet={snippet} setSnackbarState={setSnackbarState} />
                              </Grid>
                          ))
                        : "No code snippets were found."}
                </Grid>
            </Box>
        </>
    );
}
