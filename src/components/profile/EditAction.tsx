import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip } from "@mui/material";
import { useState } from "react";
import GlobalEditModal from "../GlobalEditModal";
import type { Field } from "../../types/formTypes/Field";
import AddIcon from "@mui/icons-material/Add";
import { sx } from "../../constants/SxForIcons";

interface ProfileActionsProps {
    type?: "add" | "edit";
    fields: Field[];
    title: string;
    handleClickSave: (updatedData: any) => void;
}

export default function EditAction({
    type,
    fields,
    title,
    handleClickSave,
}: ProfileActionsProps) {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    return (
        <Box display={"flex"} gap={"10px"}>
            <Box>
                <Tooltip title={"Edit"}>
                    {type === "edit" ? (
                        <EditIcon
                            sx={sx}
                            onClick={() => setOpenEditModal(true)}
                        />
                    ) : (
                        <AddIcon
                            sx={sx}
                            onClick={() => setOpenEditModal(true)}
                        />
                    )}
                </Tooltip>
                <GlobalEditModal
                    open={openEditModal}
                    fields={fields}
                    handleClose={() => setOpenEditModal(false)}
                    handleClickSave={handleClickSave}
                    title={title}
                />
            </Box>
        </Box>
    );
}
