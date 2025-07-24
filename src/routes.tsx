import App from "./App.tsx";
import Layout from "./layout/Layout.tsx";
import Contact from "@pages/Contact.tsx";
import Reservation from "@pages/Reservation.tsx";
import LogIn from "@pages/LogIn.tsx";
import EmployeeList from "@pages/EmployeeList.tsx";
import AdminSessions from "@pages/AdminSessions.tsx";
import FooterTroll from "@pages/FooterTroll.tsx";

export default [
    {
        element: <Layout />,
        path: "/",
        children: [
            { path: "", element: <App /> },
            { path: "/reservation", element: <Reservation /> },
            { path: "/contact", element: <Contact /> },
            { path: "/login", element: <LogIn /> },
            { path: "/employees", element: <EmployeeList /> },
            { path: "/admin-sessions", element: <AdminSessions /> },
            { path: "footer-troll" , element: <FooterTroll/>},
            { path : "*", element: <App /> }
        ]
    }
]