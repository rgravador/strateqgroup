import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function FormDialog({ open, setOpen, currentInvoice, handleSave }) {
    const [data, setData] = React.useState(currentInvoice)
    const handleClose = () => {
        setOpen(false);
    };

    const updateData = (new_data) => {
        setData({ ...currentInvoice, ...data, ...new_data })
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Invoice No.: {currentInvoice.InvoiceNo}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        value={data.Description ?? currentInvoice.Description}
                        onChange={(event) => updateData({ Description: event.target.value })}
                        type="text"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Amount"
                        label="Amount"
                        value={data.Amount ?? currentInvoice.Amount}
                        onChange={(event) => updateData({ Amount: event.target.value })}
                        type="number"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleSave(data)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}