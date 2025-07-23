import AddIcon from '@mui/icons-material/Add';
import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import type { Field } from '../types/formTypes/Field';

interface ProfileActionsProps {
    fields: Field[],
    title: string,
};

export default function AddAction({ fields, title }: ProfileActionsProps) {
    const sx = { cursor: "pointer", transition: "300ms opacity ease-out",  ":hover": { opacity: 0.4 } }
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    return (
        <Box display={"flex"} gap={"10px"}>
            <Box>                
                <Tooltip title="Add">
                    <AddIcon sx={sx}/>
                </Tooltip>
            </Box>
        </Box>
    )
}