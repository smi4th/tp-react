interface EmployeeEditFormData {
    firstname: string;
    lastname: string;
    email: string;
    contract: {
        type: string;
        title: string;
        annualSalary: string;
        location: string;
        startDate: string;
        endDate: string;
    };
}
