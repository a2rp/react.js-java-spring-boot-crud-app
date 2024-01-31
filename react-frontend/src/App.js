import React, { useEffect, useState } from "react"
import ListEmployees from "./components/listEmployees"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEmployee from "./components/addEmployee";
import UpdateEmployee from "./components/updateEmployee";

const App = () => {
    axios.defaults.baseURL = "http://localhost:8080/api/v1"

    const [employees, setEmployees] = useState([]);
    const [employeeAdded, setEmployeeAdded] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState({ firstName: "", lastName: "", emailId: "", id: "" });
    const [selectedToEdit, setSelectedToEdit] = useState(false);

    // get all employees
    const getEmployees = async () => {
        const config = {
            method: "GET",
            url: "/employees"
        };
        try {
            const response = await axios(config);
            const data = response.data;
            // console.log(response, "all employees response");
            setEmployees(data);
        } catch (error) {
            console.log(error, "error");
            toast(error.message);
        }
    };
    useEffect(() => {
        getEmployees();
    }, []);

    // add new employee
    const addNewEmployee = async (data) => {
        const config = {
            method: "POST",
            url: "/employees",
            data
        };
        try {
            const response = await axios(config);
            const data = response.data;
            // console.log(response, "add employee response");
            if (response.status === 200) {
                const oldEmployees = employees;
                const newEmployees = [...oldEmployees, data];
                // console.log(newEmployees, "new employees");
                setEmployees(newEmployees);
                setEmployeeAdded(true);
            }
        } catch (error) {
            console.log(error, "error");
            toast(error.message);
        }
    };

    useEffect(() => {
        // console.log(selectedEmployee, selectedToEdit, "selectedemployee");
    }, [selectedEmployee]);

    // update employee
    const updateEmployee = async (data) => {
        const config = {
            method: "PUT",
            url: `/employees/${data.id}`,
            data
        };
        try {
            const response = await axios(config);
            const data = response.data;
            // console.log(data, "put employee response");
            if (response.status === 200) {
                const values = employees;
                values[values.findIndex(el => el.id === data.id)] = data;
                // console.log(values, "values");
                setEmployees(values);
                setSelectedToEdit(false);
            }
        } catch (error) {
            console.log(error, "error");
            toast(error.message);
        }
    };

    // delete an employee
    const deleteEmployee = async (id) => {
        const config = {
            method: "DELETE",
            url: `/employees/${id}`
        };

        try {
            const response = await axios(config);
            console.log(response, "delete response");
            // console.log(data, "delete employee response");
            setEmployees(employees.filter(item => item.id !== id));
            // if (response.data.success === true) {
            //     const index = employees.findIndex(function (o) {
            //         return o.id === id;
            //     })
            //     if (index !== -1) employees.splice(index, 1);
            //     console.log("deleted");
            // }
        } catch (error) {
            console.log(error, "error");
            toast(error.message);
        }
    };

    return (
        <div style={{ padding: "15px" }}>
            <h1 style={{ fontSize: "20px", margin: "15px 0 15px 0" }}>a2rp: React.js + Spring Boot CRUD Application</h1>

            {selectedToEdit === false
                ? <AddEmployee
                    addNewEmployee={addNewEmployee}
                    employeeAdded={employeeAdded}
                    setEmployeeAdded={setEmployeeAdded}
                />
                : <UpdateEmployee
                    selectedEmployee={selectedEmployee}
                    setSelectedToEdit={setSelectedToEdit}
                    updateEmployee={updateEmployee}
                />}

            <ListEmployees
                employees={employees}
                selectedToEdit={selectedToEdit}
                setSelectedToEdit={setSelectedToEdit}
                setSelectedEmployee={setSelectedEmployee}
                deleteEmployee={deleteEmployee}
            />

            <ToastContainer />
        </div>
    )
}

export default App
