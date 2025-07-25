interface Contract {
    id: number;
    type: string;
    title: string;
    annualSalary: string;
    location: string;
    startDate: string;
    endDate: string | null;
}

interface Employee {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    dateOfBirth: string;
    contracts: Contract[];
}
