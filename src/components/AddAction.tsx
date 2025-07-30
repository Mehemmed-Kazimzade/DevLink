import AddIcon from '@mui/icons-material/Add';
import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import type { Field } from '../types/formTypes/Field';
import GlobalEditModal from './GlobalEditModal';

interface ProfileActionsProps {
    fields: Field[],
    title: string,
    handleClickSave: (addedData: any) => void,
};

export default function AddAction({ fields, title, handleClickSave }: ProfileActionsProps) {
    const sx = { cursor: "pointer", transition: "300ms opacity ease-out",  ":hover": { opacity: 0.4 } }
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    return (
        <Box display={"flex"} gap={"10px"}>
            <Box>                
                <Tooltip title="Add">
                    <AddIcon sx={sx} onClick={() => setOpenEditModal(true)}/>
                </Tooltip>
                <GlobalEditModal 
                    open={openEditModal}
                    handleClose={() => setOpenEditModal(false)}
                    title={title}
                    fields={fields}
                    handleClickSave={handleClickSave}
                />
            </Box>
        </Box>
    )
}