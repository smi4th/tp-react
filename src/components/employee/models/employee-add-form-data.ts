export interface EmployeeFormContract {
    title: string;
    type: "CDI" | "CDD";
    salary: string;
    location: string;
    startDate: string;
    endDate: string;
}

export interface EmployeeAddFormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "admin" | "superadmin";
    contract: EmployeeFormContract;
}
