import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialogAdd({ open, setOpen, handleAdd }) {
    const [data, setData] = React.useState({ Description: '', Amount: 0 });
    const handleClose = () => {
        setOpen(false);
    };

    const updateData = (new_data) => {
        setData({ ...data, ...new_data })
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Adding new Invoice
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        value={data.Description}
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
                        value={data.Amount}
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
                    <Button onClick={() => handleAdd(data)}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}