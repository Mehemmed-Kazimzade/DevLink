import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogProps {
    isDialogOpen: boolean,
    onClose: (hasClickedYes: boolean) => void,
    title: string,
    text: string
}

export default function YesOrNoDialog({ isDialogOpen, onClose, title, text }: DialogProps) {
    return <>
        <Dialog open={isDialogOpen} onClose={() => onClose(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                { title }
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { text }
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onClose(false)} sx={{ bgcolor: "#B31B1B", color: "white" }}>No</Button>
                <Button onClick={() => onClose(true)} sx={{ bgcolor: "#51A687", color: "white" }} autoFocus>Yes</Button>
            </DialogActions>

        </Dialog>
    </>
}