import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddEmployee = (props) => {
    const [employee, setEmployee] = useState({ firstName: "", lastName: "", emailId: "" });

    const handleFirstNameChange = (event) => {
        let value = event.target.value.replace(/[^a-zA-Z]+/g, "").substring(0, 20);
        setEmployee({ ...employee, firstName: value });
    };

    const handleLastNameChange = (event) => {
        let value = event.target.value.replace(/[^a-zA-Z]+/g, "").substring(0, 20);
        setEmployee({ ...employee, lastName: value });
    };

    const handleEmailIdChange = (event) => {
        setEmployee({ ...employee, emailId: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addNewEmployee(employee);
    };

    useEffect(() => {
        if (props.employeeAdded === true) {
            setEmployee({ firstName: "", lastName: "", emailId: "" });
            props.setEmployeeAdded(false);
        }
    }, [props.employeeAdded]);

    return (
        <div style={{ border: "1px solid gray", padding: "15px", width: "300px" }}>
            <h1 style={{ fontSize: "16px" }}>Add new employee</h1>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth size="small" label="First name"
                    required
                    sx={{ marginTop: "15px" }}
                    value={employee.firstName}
                    onChange={handleFirstNameChange}
                />

                <TextField fullWidth size="small" label="Last name"
                    required
                    sx={{ marginTop: "15px" }}
                    value={employee.lastName}
                    onChange={handleLastNameChange}
                />

                <TextField fullWidth size="small" label="Email id" type="email"
                    required
                    sx={{ marginTop: "15px" }}
                    value={employee.emailId}
                    onChange={handleEmailIdChange}
                />

                <Button fullWidth variant="contained" sx={{ marginTop: "15px" }}
                    type="submit"
                >Submit</Button>
            </form>
        </div>
    )
}

export default AddEmployee
