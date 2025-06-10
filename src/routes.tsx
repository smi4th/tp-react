import HomePage from "./home/HomePage.tsx";
import App from "./App.tsx";

export default [
    {
        element: <Layout />,
        path: "/",
        children: [
            { path: "", element: <App />}
        ]
    }
]