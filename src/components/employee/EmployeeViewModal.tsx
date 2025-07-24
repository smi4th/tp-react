export default function EmployeeViewModal({onClose, employee}: any) {
    return (
        <>
            <dialog className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Employee Card</h3>
                    <p className="py-2"><strong>First Name:</strong> {employee.firstname}</p>
                    <p className="py-2"><strong>Last Name:</strong> {employee.lastname}</p>
                    <p className="py-2"><strong>Email:</strong> {employee.email}</p>
                    <p className="py-2"><strong>Role:</strong> {employee.role}</p>

                    {employee.contracts?.length > 0 && (
                        <div className="mt-2">
                            <strong>Contracts:</strong>
                            <ul className="mt-2 space-y-2">
                                {employee.contracts.map((c: any, i: number) => (
                                    <li key={i} className="bg-base-200 p-2 rounded">
                                        <p><strong>Title:</strong> {c.title}</p>
                                        <p><strong>Type:</strong> {c.type}</p>
                                        <p><strong>Salary:</strong> {c.annualSalary} €</p>
                                        <p><strong>Location:</strong> {c.location}</p>
                                        <p><strong>Start Date:</strong> {new Date(c.startDate).toLocaleDateString()}</p>
                                        <p><strong>End
                                            Date:</strong> {c.endDate ? new Date(c.endDate).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="modal-action">
                        <button onClick={onClose} className="btn">Close</button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
