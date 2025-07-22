import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { useState } from 'react';
import GlobalEditModal from './GlobalEditModal';
import type { Field } from '../types/formTypes/Field';

interface ProfileActionsProps {
    showAddIcon: boolean,
    fields: Field[],
    title: string,
};

export default function ProfileActions({ showAddIcon, fields, title }: ProfileActionsProps) {
    const sx = { cursor: "pointer", transition: "300ms opacity ease-out",  ":hover": { opacity: 0.4 } }
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    return (
        <Box display={"flex"} gap={"10px"}>
            {showAddIcon && <AddIcon sx={sx}/>}

            <EditIcon sx={sx} onClick={() => setOpenEditModal(true)} />
            <GlobalEditModal open={openEditModal} 
                    fields={fields}
                    handleClose={() => setOpenEditModal(false)} 
                    title={title} />
        </Box>
    )
}