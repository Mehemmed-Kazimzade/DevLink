import { Alert, Snackbar } from "@mui/material";

interface GlobalSnackbarProps {
    message: string;
    open: boolean;
    handleClose: () => void;
}

export default function GlobalSnackbar({
    message,
    open,
    handleClose,
}: GlobalSnackbarProps) {
    return (
        <Snackbar
            autoHideDuration={4000}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            message={message}
            color="red"
        >
            <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%", fontSize: 14, alignItems: "center" }}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
