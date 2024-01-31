import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const UpdateEmployee = (props) => {
    const [employee, setEmployee] = useState({ id: "", firstName: "", lastName: "", emailId: "" });

    useEffect(() => {
        setEmployee(props.selectedEmployee);
    }, [props.selectedEmployee]);

    useEffect(() => {
        // console.log(employee, "employee");
    }, [employee]);

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
        // return console.log(employee, "update componenet");
        props.updateEmployee(employee);
    };

    return (
        <div style={{ border: "1px solid gray", padding: "15px", width: "300px" }}>
            <h1 style={{ fontSize: "16px" }}>Update employee</h1>
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

                <div style={{ display: "flex", gap: "30px" }}>
                    <Button fullWidth variant="contained" sx={{ marginTop: "15px" }}
                        type="submit"
                    >Submit</Button>
                    <Button fullWidth variant="contained" sx={{ marginTop: "15px" }} color="error"
                        onClick={() => props.setSelectedToEdit(false)}
                    >Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateEmployee
