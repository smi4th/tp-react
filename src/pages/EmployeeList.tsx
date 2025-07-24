import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import EmployeeViewModal from "@components/employee/EmployeeViewModal.tsx";
import EmployeeEditModal from "@components/employee/EmployeeEditModal.tsx";
import NewEmployeeButton from "@components/employee/NewEmployeeButton.tsx";
import EmployeeSearchBar from "@components/employee/EmployeeSearchBar.tsx";

const apiUrl: string = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [viewModalEmployee, setViewModalEmployee] = useState<Employee | null>(null);
    const [editModalEmployee, setEditModalEmployee] = useState<Employee | null>(null);

    const [page, setPage] = useState<number>(1)
    let totalPageEmployees = useRef(0)
    let totalEmployees = useRef(0)

    function getAllEmployeesList(page: number = 1, limit: number = 5) {
        const myHeaders = new Headers();
        const authToken = localStorage.getItem("authToken");
        myHeaders.append("Authorization", "Bearer " + authToken);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        const fetchEmployees = async () => {
            try {
                const getAllUsers = await fetch(`${apiUrl}/adminEmployee/users?page=${page}&limit=${limit}`, requestOptions);
                if (getAllUsers.ok) {
                    return await getAllUsers.json();
                }

            } catch (error) {
                console.error("Erreur lors du chargement des employés :");
            }
        };
        fetchEmployees().then(res => {
            setEmployees(res.users);
            totalPageEmployees.current = res.totalPages;
            totalEmployees.current = res.totalResults;
        });

    }

    useEffect(() => {
        // fetchEmployees().then(res => setEmployees(res.users));
        getAllEmployeesList();

    }, []);

    const handleView = async (id: string) => {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${apiUrl}/adminEmployee/users/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        if (res.ok) {
            const data = await res.json();
            setViewModalEmployee(data);
        }
    };


    const handleEdit = async (id: number, updatedData: any) => {
        const token = localStorage.getItem("authToken");
        try {
            const res = await fetch(`${apiUrl}/adminEmployee/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) {
                alert("Erreur lors de la mise à jour de l'utilisateur");
            } else {
                alert("L'utilisateur est bien mis à jour")
                const updatedUser = await res.json();
                const updatedEmployees =
                    employees.map(e => {
                        if (e.id == updatedUser.id) {
                            return {...updatedUser}
                        } else {
                            return e;
                        }
                    });
                setEmployees(updatedEmployees);
            }
        } catch (error) {
            console.error("Échec de la mise à jour :");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Confirmer la suppression de cet utilisateur ?")) return;
        try {
            const authToken = localStorage.getItem("authToken");
            const res = await fetch(`${apiUrl}/adminEmployee/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + authToken,
                },
            });
            if (res.ok) {
                setEmployees(prev => prev.filter(e => e.id !== id));
            }
        } catch (err) {
            console.error("Erreur lors de la suppression :", err);
        }
    };

    const handlePrevPage = async => {
        if (page > 1) {
            getAllEmployeesList(page - 1);
            setPage(prevState => prevState - 1)

        }

    }

    const handleNextPage = async => {
        if (page < totalPageEmployees.current) {
            getAllEmployeesList(page + 1);
            setPage(prevState => prevState + 1)
        }
    }

    const handleSearch = async (data) => {
        setEmployees(data.users);
        totalPageEmployees.current = data.totalPages;
        totalEmployees.current = data.totalResults;
    }
    return (
        <div style={{marginTop: "2rem", marginRight: "3rem", marginLeft: "3rem"}}>
            <div className="flex flex-row justify-between">
                <NewEmployeeButton onSuccess={getAllEmployeesList}/>
                <div className="">EMPLOYEES DASHBOARD</div>
                <EmployeeSearchBar
                    onSuccess={(data) => handleSearch(data)}
                    onReset={getAllEmployeesList}/>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
                 style={{marginTop: "1rem"}}>
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th>Action</th>
                        <th>EmployeeId</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contract</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((emp: any) => (
                        <tr key={emp.id}>
                            <td className="flex gap-1">
                                <button
                                    title="Voir l'utilisateur"
                                    onClick={() => handleView(emp.id)}
                                    className="bg-blue-400 hover:bg-blue-500 text-black px-2 py-1 rounded"
                                >
                                    {/* œil */}
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 5c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3m0-2a5 5 0 1 0 0 10A5 5 0 0 0 12 3zm0 14c-3.3 0-6.1 1.6-7 4h14c-.9-2.4-3.7-4-7-4z"/>
                                    </svg>
                                </button>

                                <button
                                    title="Modifier l'utilisateur"
                                    onClick={() => setEditModalEmployee(emp)}
                                    className="bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 rounded"
                                >
                                    {/* crayon */}
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M3 17.25V21h3.75l11.02-11.02-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                    </svg>
                                </button>

                                <button
                                    title="Supprimer l'utilisateur"
                                    onClick={() => handleDelete(emp.id)}
                                    className="bg-red-400 hover:bg-red-500 text-black px-2 py-1 rounded"
                                >
                                    {/* corbeille */}
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7z"/>
                                    </svg>
                                </button>
                            </td>
                            <td>{emp.id}</td>
                            <td>{emp.firstname} {emp.lastname}</td>
                            <td>{emp.email}</td>
                            <td>
                                {emp.contracts?.length > 0 ? (
                                    <ul>
                                        {emp.contracts.map((contract: any, index: number) => (
                                            <li key={index}>
                                                {contract.title} – {contract.type}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    "—"
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {viewModalEmployee && createPortal(
                    <EmployeeViewModal
                        employee={viewModalEmployee}
                        onClose={() => setViewModalEmployee(null)}
                    />,
                    document.body
                )}

                {editModalEmployee && createPortal(
                    <EmployeeEditModal
                        employee={editModalEmployee}
                        onClose={() => setEditModalEmployee(null)}
                        onUpdate={(data) => handleEdit(editModalEmployee!.id, data)}
                    />,
                    document.body
                )}

                <div style={{marginTop: "2rem"}} className="flex justify-between">
                    <div className="join-item join grid grid-cols-2">
                        <button className={`join-item btn btn-outline ${page == 1 ? "btn-disabled" : ""}`}
                                onClick={handlePrevPage}>Previous page
                        </button>
                        <button
                            className={`join-item btn btn-outline ${page == totalPageEmployees.current ? "btn-disabled" : ""}`}
                            onClick={handleNextPage}>Next
                        </button>
                    </div>
                    <div className="join-item col-2">
                        <p>Page {page} of total {totalPageEmployees.current} pages</p>
                        <p>Total employees: {totalEmployees.current}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
