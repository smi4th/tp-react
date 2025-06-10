import React from "react";
import ReactDOM from "react-dom/client";
import './homepage/Homepage.css'
import routes from "./routes";
import {createBrowserRouter, RouterProvider} from "react-router";

const router = createBrowserRouter(routes);

async function enableMocking() {
    if (import.meta.env.MODE !== "development") {
        return;
    }

    const { worker } = await import("./mocks/browser");

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start();
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
});
