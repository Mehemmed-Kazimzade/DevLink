import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner() {
    return (
        <Box className="centered-container">
            <CircularProgress size={100} />
        </Box>
    )
}