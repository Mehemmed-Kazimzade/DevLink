import { useState } from "react";
import { initialSnackbarState } from "../constants/initialSnackbarState";

export default function useSnackbar() {
    const [snackbarState, setSnackbarState] = useState(initialSnackbarState);

    const isSnackbarOpen = snackbarState.open;
    const snackbarMessage = snackbarState.message;
    const snackbarSeverity = snackbarState.severity;

    return { isSnackbarOpen, setSnackbarState, snackbarMessage, snackbarSeverity }
}