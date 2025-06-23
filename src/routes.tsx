import App from "./App.tsx";
import Layout from "./layout/Layout.tsx";
import Contact from "./pages/Contact.tsx";
import Reservation from "./pages/Reservation.tsx";
import LogIn from "./pages/employee/LogIn.tsx";
import EmployeeList from "./pages/employee/EmployeeList.tsx";

export default [
    {
        element: <Layout />,
        path: "/",
        children: [
            { path: "", element: <App /> },
            { path: "/reservation", element: <Reservation /> },
            { path: "/contact", element: <Contact /> },
            { path: "/login", element: <LogIn /> },
            { path: "/employees", element: <EmployeeList /> }

        ]
    }
]