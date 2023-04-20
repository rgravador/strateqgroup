import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormDialog from '../components/dialogUI';
import FormDialogAdd from '../components/dialogAddUI';
const columns = [
    { id: 'InvoiceNo', label: 'InvoiceNo', minWidth: 170 },
    {
        id: 'Description',
        label: 'Description',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Status',
        label: 'Status',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'CreatedDate',
        label: 'Created Date',
        minWidth: 170,
        align: 'left',
        format: (value) => new Date(value).toDateString(),
    },
    {
        id: 'Amount',
        label: 'Amount',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'Actions',
        label: 'Actions',
        align: 'center',
    }
];





export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([])
    const [dialog, setDialog] = React.useState(false)
    const [dialog2, setDialog2] = React.useState(false)
    const [currentInvoice, setCurrentInvoice] = React.useState({})
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleDelete = async (invoiceNo) => {
        const deleteInvoice = await axios.delete(`http://localhost:3001/invoices/${invoiceNo}`);
        if (deleteInvoice.data.error) {
            alert(deleteInvoice.data.message);
        } else {
            getData()
        }
    }

    const handleEdit = async (data) => {
        setCurrentInvoice(data)
        setDialog(true)
    }
    const handleSave = async (data) => {
        await axios.put('http://localhost:3001/invoices', data)
        getData()
        setDialog(false)
    }

    const handleAdd = async (data) => {
        await axios.post('http://localhost:3001/invoices', data)
        getData()
        setDialog2(false)
    }

    function createData(InvoiceNo, Description, Status, CreatedDate, Amount) {
        return { InvoiceNo, Description, Status, CreatedDate, Amount, Actions: rowAction({ InvoiceNo, Description, Status, CreatedDate, Amount }) };
    }

    const rowAction = (data) => {
        return <div>
            <IconButton aria-label="delete" color='primary' onClick={() => handleEdit(data)}>
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" color="warning" onClick={() => handleDelete(data.InvoiceNo)}>
                <DeleteIcon />
            </IconButton>
        </div>
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const openAdd = () => {
        setDialog2(true)
    }
    const getData = async () => {
        const { data } = await axios.get("http://localhost:3001/invoices");
        if (data.error) {
        } else {
            let _rows1 = await data.data.map((item) => createData(item.InvoiceNo, item.Description, item.Status, item.CreatedDate, item.Amount))
            setRows(_rows1)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="my-table-container">
            <div className="invoice-header">
                <h1>INVOICES</h1>
                <Button variant="contained" onClick={() => openAdd()}>Add</Button>
            </div>
            <br />
            <FormDialog open={dialog} setOpen={setDialog} currentInvoice={currentInvoice} handleSave={handleSave} />
            <FormDialogAdd open={dialog2} setOpen={setDialog2} handleAdd={handleAdd} />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.InvoiceNo}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}