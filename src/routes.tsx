import App from "./App.tsx";
import Layout from "./layout/Layout.tsx";
import Contact from "./pages/Contact.tsx";
import Reservation from "./pages/Reservation.tsx";

export default [
    {
        element: <Layout />,
        path: "/",
        children: [
            { path: "", element: <App /> },
            { path: "reservation", element: <Reservation /> },
            { path: "contact", element: <Contact /> }
        ]
    }
]