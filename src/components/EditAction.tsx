import EditIcon from '@mui/icons-material/Edit';
import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import GlobalEditModal from './GlobalEditModal';
import type { Field } from '../types/formTypes/Field';

interface ProfileActionsProps {
    fields: Field[],
    title: string,
    handleClickSave: (updatedData: any) => void
};

export default function EditAction({ fields, title, handleClickSave }: ProfileActionsProps) {
    const sx = { cursor: "pointer", transition: "300ms opacity ease-out",  ":hover": { opacity: 0.4 } }
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    return (
        <Box display={"flex"} gap={"10px"}>
            <Box>
                <Tooltip title={"Edit"}>
                    <EditIcon sx={sx} onClick={() => setOpenEditModal(true)} />
                </Tooltip>
                <GlobalEditModal open={openEditModal} 
                    fields={fields}
                    handleClose={() => setOpenEditModal(false)}
                    handleClickSave={handleClickSave}
                    title={title} />
            </Box>
        </Box>
    )
}