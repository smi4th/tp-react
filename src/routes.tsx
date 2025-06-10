import Homepage from "./homepage/Homepage.tsx";
import Layout from "./layout/Layout.tsx";
import Reservation from "./components/reservation/reservation.tsx";

export default [
    {
        element: <Layout />,
        path: "/",
        children: [
            { path: "", element: <Homepage /> },
            { path: "/reservation", element: <Reservation /> }
        ]
    }
]