import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Swal from "sweetalert2";

const ListEmployees = (props) => {
    const [employees, setEmployees] = useState([]);
    const [viewEmployee, setViewEmployee] = useState({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setEmployees(props.employees);
    }, [props.employees]);

    const deleteEmployee = (id) => {
        Swal.fire({
            title: "Do you want to delete id: " + id + " ???",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don"t delete`
        }).then((result) => {
            if (result.isConfirmed) {
                props.deleteEmployee(id);
            }
        });
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>List of all employees</h3>
            <TableContainer sx={{ maxHeight: 300 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.headerTableCell}>Id</TableCell>
                            <TableCell className={styles.headerTableCell}>First name</TableCell>
                            <TableCell className={styles.headerTableCell}>Last name</TableCell>
                            <TableCell className={styles.headerTableCell}>Email id</TableCell>
                            <TableCell className={styles.headerTableCell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees && employees.map(employee => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.firstName}</TableCell>
                                <TableCell>{employee.lastName}</TableCell>
                                <TableCell>{employee.emailId}</TableCell>
                                <TableCell>
                                    <Button variant="contained" size="small" sx={{ marginRight: "15px" }} color="success"
                                        onClick={() => { setViewEmployee(employee); handleClickOpen(); }}
                                    >View</Button>
                                    <Button variant="contained" size="small" sx={{ marginRight: "15px" }}
                                        onClick={() => { props.setSelectedEmployee(employee); props.setSelectedToEdit(true); }}
                                    >Edit</Button>
                                    <Button variant="contained" size="small" color="error"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User details of user with id: {viewEmployee.id}</DialogTitle>
                <DialogContent>
                    <TextField label="Email id" value={viewEmployee.emailId} disabled={true} fullWidth sx={{ margin: "15px 0 15px 0" }} />
                    <TextField label="First name" value={viewEmployee.firstName} disabled={true} fullWidth sx={{ margin: "15px 0 15px 0" }} />
                    <TextField label="Last name" value={viewEmployee.lastName} disabled={true} fullWidth sx={{ margin: "15px 0 15px 0" }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ListEmployees
