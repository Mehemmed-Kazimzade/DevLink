type SnackbarSeverity = "success" | "error";

export interface SnackbarState {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}

export const initialSnackbarState: SnackbarState = { open: false, message: "", severity: "success" }