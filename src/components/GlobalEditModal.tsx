import { Box, Button, Modal, Stack } from "@mui/material";
import RsTypography from "./ui/RsTypography";
import type { Field } from "../types/formTypes/Field";
import ImageUpload from "./ImageUpload";
import EditText from "./EditText";
import EditBigText from "./EditBigText";

interface GlobalModalProps {
  open: boolean;
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
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function GlobalEditModal({open,handleClose,title,fields}: GlobalModalProps) {
    if (!fields || !Array.isArray(fields)) return;

    const form1 = fields.map(field => field.currValue);

    const onSave = () => {
        const form2 = [];
        for(const field of fields) {
            const element = field.ref.current;
            if (element?.type === "file" && element instanceof HTMLInputElement) {
                const file = element.files?.[0];
            }
            else{
                form2.push(element);
            }
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
            <RsTypography text={title} xs="24px" lg={"30px"} />
            <Stack spacing={4} mt={2}>
                {fields.map((field, idx) => {

                if (field.type === "image") {
                    return <ImageUpload key={idx} ref={field.ref as React.RefObject<HTMLInputElement>}
                            currValue={field.currValue} />
                }

                if (field.type === "text") {
                    return <EditText key={idx} ref={(field.ref as React.RefObject<HTMLInputElement>)} currValue={field.currValue} />;
                }

                if (field.type === "bigText") {
                    return <EditBigText key={idx} ref={field.ref as React.RefObject<HTMLTextAreaElement>} currValue={field.currValue} />
                }
                })}

                <Box display={"flex"} gap="20px">
                    <Button onClick={onSave} variant="contained" sx={{ bgcolor: "#51A687" }}>
                        SAVE
                    </Button>

                    <Button onClick={onSave} variant="contained" sx={{ bgcolor: "#B31B1B" }}>
                        CANCEL
                    </Button>
                </Box>

            </Stack>
            </Box>
        </Modal>
    );
}
