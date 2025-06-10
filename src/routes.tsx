import App from "./App.tsx";
import Layout from "./layout/Layout.tsx";
import Reservation from "./components/reservation/reservation.tsx";

export default [
    {
        element: <Layout />,
        path: "/",
        children: [
            { path: "", element: <App /> },
            { path: "reservation", element: <Reservation /> } // Add this line
        ]
    }
]