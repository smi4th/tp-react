import App from "./App.tsx";
import Layout from "./layout/Layout.tsx";

export default [
    {
        element: <Layout />,
        path: "/",
        children: [
            { path: "", element: <App />}
        ]
    }
]