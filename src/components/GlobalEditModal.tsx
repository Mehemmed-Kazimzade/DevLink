import { Box, Button, Modal, Stack } from "@mui/material";
import RsTypography from "./ui/RsTypography";
import type { Field } from "../types/formTypes/Field";
import ImageUpload from "./profile/ImageUpload";
import EditText from "./profile/EditText";
import EditBigText from "./profile/EditBigText";
import DifferFields from "../utils/DifferFields";
import { useEffect, useRef, useState, type RefObject } from "react";
import YesOrNoDialog from "./YesOrNoDialog";
import Technologies, { type TechnologiesRef } from "./profile/Technologies";
import SelectLanguage, { type SelectLanguageRef } from "./profile/SelectLanguage";
import CodeEditor, { type PreviewRef } from "./profile/CodeEditor";

interface GlobalModalProps {
    open: boolean;
    handleClickSave: (updatedData: any) => void;
    handleClose: () => void;
    title: string;
    fields: Field[];
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 700,
    width: "80%",
    maxHeight: "700px",
    overflow: "scroll",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

export default function GlobalEditModal({
    open,
    handleClose,
    title,
    fields,
    handleClickSave,
}: GlobalModalProps) {
    if (!fields || !Array.isArray(fields)) return;

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const form1 = useRef<(string | string[])[]>([]);

    useEffect(() => {
        form1.current = fields.map((field) => {
            if (field.type === "image") return field.currValue ?? "";
            if (field.type === "technology") return field.values ?? [];
            return field.currValue ?? "";
        });
    }, [fields]);

    const onSave = (hasClickedSave: boolean) => {
        const form2 = fields.map((field) => {
            if (
                field.type === "image" &&
                field.ref.current instanceof HTMLInputElement
            ) {
                return field.ref.current.files?.[0] ?? null;
            }

            return field.ref.current?.value ?? "";
        });

        const haveUserChangedFields = DifferFields(form1.current, form2);

        if (hasClickedSave) {
            if (haveUserChangedFields) {
                const data: Record<string, any> = {};
                fields.forEach((field, idx) => {
                    if (field.type === "technology") {
                        const strArr = form2[idx] as string[];
                        data[field.name] = strArr.map((t) => ({
                            skillName: t,
                        }));
                    }
                    data[field.name] = form2[idx];
                });

                handleClickSave(data);
            }

            handleClose();
        } else {
            if (haveUserChangedFields) setDialogOpen(true);
            else handleClose();
        }
    };

    const onDialogClose = (hasClickedYes: boolean) => {
        if (hasClickedYes) handleClose();
        setDialogOpen(false);
    };

    return (
        <>
            <YesOrNoDialog
                title="Are you sure you want to discard changes"
                text="This action cannot be undone."
                isDialogOpen={dialogOpen}
                onClose={onDialogClose}
            />

            <Modal open={open} onClose={() => onSave(false)}>
                <Box sx={style}>
                    <RsTypography text={title} xs="24px" lg={"30px"} />
                    <Stack spacing={4} mt={2}>
                        {fields.map((field, idx) => {
                            if (field.type === "image") {
                                return (
                                    <ImageUpload
                                        key={idx}
                                        ref={
                                            field.ref as React.RefObject<HTMLInputElement>
                                        }
                                        currValue={field.currValue}
                                    />
                                );
                            }

                            if (field.type === "text") {
                                return (
                                    <EditText
                                        key={idx}
                                        ref={
                                            field.ref as React.RefObject<HTMLInputElement>
                                        }
                                        currValue={field.currValue}
                                    />
                                );
                            }

                            if (field.type === "bigText") {
                                return (
                                    <EditBigText
                                        key={idx}
                                        ref={
                                            field.ref as React.RefObject<HTMLTextAreaElement>
                                        }
                                        currValue={field.currValue}
                                    />
                                );
                            }

                            if (field.type === "technology") {
                                return (
                                    <Technologies
                                        key={idx}
                                        techStack={field.values ?? []}
                                        ref={
                                            field.ref as React.RefObject<TechnologiesRef>
                                        }
                                    />
                                );
                            }

                            if (field.type === "singleTech") {
                                return (
                                    <SelectLanguage
                                        key={idx}
                                        selectedTech={field.currValue}
                                        ref={
                                            field.ref as React.RefObject<SelectLanguageRef>
                                        }
                                    />
                                );
                            }

                            if (field.type === "editor") {
                                return (
                                    <CodeEditor
                                        key={idx}
                                        preview={field.currValue}
                                        ref={field.ref as RefObject<PreviewRef>}
                                    />
                                );
                            }
                        })}

                        <Box display={"flex"} gap="20px">
                            <Button
                                onClick={() => onSave(true)}
                                variant="contained"
                                sx={{ bgcolor: "#51A687" }}
                            >
                                SAVE
                            </Button>

                            <Button
                                onClick={() => onSave(false)}
                                variant="contained"
                                sx={{ bgcolor: "#B31B1B" }}
                            >
                                CANCEL
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
