import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

interface ProfileActionsProps {
    showAddIcon: boolean,
}

export default function ProfileActions({ showAddIcon }: ProfileActionsProps) {
    const sx = { cursor: "pointer", transition: "300ms opacity ease-out",  ":hover": { opacity: 0.4 } }

    return (
        <Box display={"flex"} gap={"10px"}>
            {showAddIcon && <AddIcon sx={sx}/>}
            <EditIcon sx={sx} />
        </Box>
    )
}